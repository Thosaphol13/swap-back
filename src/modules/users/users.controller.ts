import { Body, Controller, Get, Post, HttpException, HttpStatus, Param, Patch, InternalServerErrorException, UploadedFile, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './users.entity';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Observable } from 'rxjs';
import { STARUS_ENUM } from 'src/enums/user_status.enums';
interface UploadResponse {
  message: string;
  url: string;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
  @Patch(':id')
  async editProfile(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    try {
      return await this.usersService.editProfile(id, updateUserDto);
    } catch (error) {
      console.error('Error in editProfile controller:', error);
      throw new InternalServerErrorException('Error updating user');
    }
  }
  @Post(':id/upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-pictures', // Folder where files will be stored
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}${path.extname(file.originalname)}`;
          cb(null, fileName); // Name of the uploaded file
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\//)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<UploadResponse> {
    // Construct the file URL based on where it's stored
    const fileUrl = `http://localhost:3001/uploads/profile-pictures/${file.filename}`;
    return new Observable((observer) => {
      observer.next({
        message: 'File uploaded successfully',
        url: fileUrl,
      });
      observer.complete();
    });
  }
  @Patch(':id/change-status')
  async changeStatus(
    @Param('id') id: number,
    @Body('status') status: STARUS_ENUM,
  ): Promise<User> {
    try {
      return await this.usersService.changeStatus(id, status);
    } catch (error) {
      console.error('Error in changeStatus controller:', error);
      throw new InternalServerErrorException('Error changing user status');
    }
  }
  // ใน UsersController หรือ ReportUsersController
@Get(':id/banned-status')
async checkUserBanStatus(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.isUserBanned(id);
}

}

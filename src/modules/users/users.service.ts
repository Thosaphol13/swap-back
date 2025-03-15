import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { STARUS_ENUM } from 'src/enums/user_status.enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async updateProfilePicture(userId: string, profilePictureUrl: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: Number(userId) } });
    if (!user) {
      throw new Error('User not found');
    }

    user.profilePicture = profilePictureUrl;
    return this.usersRepository.save(user); // Save the updated user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // ตรวจสอบการมีอยู่ของผู้ใช้ที่มีอีเมลหรือหมายเลขโทรศัพท์ซ้ำ
    const existingUser = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { phoneNumber: createUserDto.phoneNumber },
      ],
    });

    if (existingUser) {
      throw new ConflictException('User with this email or phone number already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
  
  async getAllUsers(): Promise<User[] | undefined> {
    return this.usersRepository.find();
  }
  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
  async editProfile(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id }, });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }  
      // Update user data
      Object.assign(user, updateUserDto);
  
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Error updating user');
    }
  }
  async changeStatus(id: number, status: STARUS_ENUM): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      user.status = status;
  
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Error changing user status:', error);
      throw new InternalServerErrorException('Error changing user status');
    }
  }
  async isUserBanned(userId: number): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return user ? user.banned : false;
}


  
}

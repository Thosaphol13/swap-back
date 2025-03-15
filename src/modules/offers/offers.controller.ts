import { Controller, Post, Body, Get, Param, Patch, Put, Req, UseInterceptors, UploadedFile, HttpException, HttpStatus, UploadedFiles } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './offer.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post('create')
  async createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, { // 'files' คือชื่อฟิลด์ที่ส่งจากคลient
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
      }
      cb(null, true);
    },
  }))
  async uploadFiles(@UploadedFiles() files) {
    if (!files || files.length === 0) {
      throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
    }

    const fileUrls = files.map(file => `http://localhost:3001/uploads/${file.filename}`);
    return { fileUrls };  // ส่ง URL ของไฟล์ทั้งหมดกลับไป
  }

  @Get()
  async getOffers(): Promise<Offer[]> {
    return this.offersService.getOffers();
  }

  @Get(':id')
async getOfferById(@Param('id') id: number): Promise<Offer> {
  return this.offersService.getOfferById(id);
}

  @Get('user/:user_id')
  async getOffersByUserId(@Param('user_id') user_id: number): Promise<Offer[]> {
    return this.offersService.getOffersByUserId(user_id);
  }
  @Get('sent/:user_id')
  async getOffersBySenderId(@Param('user_id') user_id: number): Promise<Offer[]> {
    return this.offersService.getOffersBySenderId(user_id);
  }
  @Get('receiver/:user_id')
  async getOffersByReceiverId(@Param('user_id') user_id: number): Promise<Offer[]> {
    return this.offersService.getOffersByReceiverId(user_id);
  }
  @Post('accept')
  async acceptOffer(@Body() body: { offerId: number }) {
    return this.offersService.acceptOffer(body.offerId);
  }

  @Post('reject')
  async rejectOffer(@Body() body: { offerId: number }) {
    return this.offersService.rejectOffer(body.offerId);
  }
  @Post('update-delivery-type')
  async updateDeliveryType(
    @Body('offerId') offerId: number,
    @Body('deliveryType') deliveryType: 'IN_PERSON' | 'REMOTE',
  ) {
    const updatedOffer = await this.offersService.updateDeliveryType(offerId, deliveryType);
    return { message: 'Delivery type updated successfully', updatedOffer };
  }
}

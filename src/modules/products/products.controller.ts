// src/modules/products/products.controller.ts

import { Body, Controller, Post, Get, Param, UseInterceptors, HttpStatus, HttpException, UploadedFile, Delete, Query, NotFoundException, Put, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { PRODUCT_STATUS_ENUM } from 'src/enums/product_status.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

@Post('create')
async createProduct(@Body() createProductDto: CreateProductDto) {
  console.log("Body=========", createProductDto);
  return this.productsService.create(createProductDto);
}
@Post('upload')
@UseInterceptors(FilesInterceptor('files', 10, {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
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


@Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<Product> {
    return this.productsService.findByName(name);
  }
@Get()
  async getAllProducts() {
    return this.productsService.findAll();
  }
  @Get('user/:userId')
  async getUserProducts(@Param('userId') userId: number): Promise<Product[]> {
    return this.productsService.findByUser(userId);
  }
  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Get('status')
  async findByStatus(@Query('status') status: PRODUCT_STATUS_ENUM) {
    if (!Object.values(PRODUCT_STATUS_ENUM).includes(status as PRODUCT_STATUS_ENUM)) {
      throw new NotFoundException('Invalid product status');
    }
    return await this.productsService.findByStatus(status as PRODUCT_STATUS_ENUM);
  }
  @Post('complete')
  async markAsCompleted(@Body('productId') productId: number) {
    return this.productsService.markAsCompleted(productId);
  }
  @Get('status/:productId')
async checkStatusByProductId(@Param('productId') productId: number) {
  return this.productsService.checkStatus(productId);
}
@Delete(':id')
async deleteProduct(@Param('id') id: number): Promise<{ message: string }> {
  return this.productsService.deleteById(id);
}
@Put(':id')
async update(@Param('id') id: number, @Body() updateProductDto: CreateProductDto) {
  return this.productsService.updateProduct(id, updateProductDto);
}



}

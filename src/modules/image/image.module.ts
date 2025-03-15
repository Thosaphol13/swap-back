import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { Image } from "./entities/image.entity";
import { Product } from "../products/products.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Image,Product])],  // Include Image entity here
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],  // Export ImageService
})
export class ImageModule {}
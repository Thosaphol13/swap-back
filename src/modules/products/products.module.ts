import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { User } from '../users/users.entity';
import { ProductCategory } from '../product-categories/product-categories.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ProductCategoryService } from '../product-categories/product-categories.service';
import { Offer } from '../offers/offer.entity';
import { Image } from '../image/entities/image.entity';
import { ImageModule } from '../image/image.module';
import { RegionModule } from '../region/region.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, ProductCategory, Offer, Image]),
    ImageModule,  // Import ImageModule
    UsersModule,
    RegionModule  // Import UsersModule
  ],
  providers: [ProductsService, UsersService, ProductCategoryService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}

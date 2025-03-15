import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryService } from './product-categories.service';
import { ProductCategoryController } from './product-categories.controller';
import { ProductCategory } from './product-categories.entity';
import { Product } from '../products/products.entity';
 // Ensure the correct path

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory, Product]), // Ensure both entities are included
  ],
  providers: [ProductCategoryService],
  controllers: [ProductCategoryController],
  exports: [ProductCategoryService], // Export if needed in other modules
})
export class ProductCategoriesModule {}

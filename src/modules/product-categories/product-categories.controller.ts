import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoryService } from './product-categories.service';

@Controller('categories')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Post()
  async createCategory(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.createCategory(createProductCategoryDto);
  }

  @Post(':categoryId/products/:productId')
  async linkProductToCategory(
    @Param('categoryId') categoryId: number,
    @Param('productId') productId: number,
  ) {
    return this.productCategoryService.linkProductToCategory(productId, categoryId);
  }
  @Get(':categoryId')
  async findById(@Param('categoryId') categoryId: number) {
    return this.productCategoryService.findById(categoryId);
  }
  @Get(':categoryId/products')
  async findProductsByCategory(@Param('categoryId') categoryId: number) {
    return this.productCategoryService.findProductsByCategory(categoryId);
  }
  
  @Get()
  async getAllCategories() {
    return this.productCategoryService.findAllCategories();
  }

}

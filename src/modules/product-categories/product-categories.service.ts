import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './product-categories.entity';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { Product } from '../products/products.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createCategory(createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategory> {
    const newCategory = this.productCategoryRepository.create(createProductCategoryDto);
    return this.productCategoryRepository.save(newCategory);
  }

  async findAllCategories(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find({ relations: ['products'] });
  }

  async linkProductToCategory(productId: number, categoryId: number): Promise<ProductCategory> {
    const category = await this.productCategoryRepository.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    category.products.push(product);
    return this.productCategoryRepository.save(category);
  }
  async findById(categoryId: number): Promise<ProductCategory> {
    return await this.productCategoryRepository.findOne({ where: { id: categoryId } ,relations: ['products']});
  }
  async findProductsByCategory(categoryId: number): Promise<Product[]> {
    const category = await this.productCategoryRepository.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category.products;
  }
}

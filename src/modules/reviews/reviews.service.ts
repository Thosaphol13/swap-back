// src/modules/reviews/reviews.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';



@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    
  ) {}

  async createReview(userFromId: number, userToId: number, content: string, rating: number,ProductId: number): Promise<Review> {
    const userFrom = await this.userRepository.findOne({ where: { id: userFromId } });
    const userTo = await this.userRepository.findOne({ where: { id: userToId } });
    const product = await this.productRepository.findOne({ where: { id: ProductId } });

    if (!userFrom || !userTo) {
      throw new Error('User not found');
    }

    const review = this.reviewRepository.create({
      userfrom: userFrom,
      userTo: userTo,
      content,
      rating,
      product: product
    });

    return await this.reviewRepository.save(review);
  }
  async hasUserReviewedProduct(userFromId: number, productId: number): Promise<boolean> {
    const existingReview = await this.reviewRepository.findOne({ 
        where: { 
            userfrom: { id: userFromId }, 
            product: { id: productId } 
        } 
    });

    return !!existingReview; 
}


  async getReviewsByUser(userId: number): Promise<Review[]> {
    return await this.reviewRepository.find({ where: { userTo: { id: userId } }, relations: ['userfrom', 'userTo'] });
  }
}
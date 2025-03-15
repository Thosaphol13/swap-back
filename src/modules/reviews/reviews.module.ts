import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './review.entity';  // Ensure correct path
import { Product } from '../products/products.entity';  // Ensure correct path
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Product])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}

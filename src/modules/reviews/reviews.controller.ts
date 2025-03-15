// src/modules/reviews/reviews.controller.ts
import { Controller, Post, Body, Param, Get, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async createReview(
    @Body('userFromId') userFromId: number,
    @Body('userToId') userToId: number,
    @Body('content') content: string,
    @Body('rating') rating: number,
    @Body('ProductId') ProductId: number
  ) {
    return this.reviewsService.createReview(userFromId, userToId, content, rating, ProductId);
  }
  @Get('has-reviewed/:userFromId/:productId')
    async hasUserReviewedProduct(
        @Param('userFromId', ParseIntPipe) userFromId: number,
        @Param('productId', ParseIntPipe) productId: number
    ): Promise<{ hasReviewed: boolean }> {
        const hasReviewed = await this.reviewsService.hasUserReviewedProduct(userFromId, productId);
        return { hasReviewed };
    }

  @Get(':userId')
  async getReviewsByUser(@Param('userId') userId: number) {
    return this.reviewsService.getReviewsByUser(userId);
  }
}

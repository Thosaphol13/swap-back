import { Product } from 'src/modules/products/products.entity';
// src/modules/reviews/dto/create-review.dto.ts
export class CreateReviewDto {
    reviewerId: number;
    productId: number;
    rating: number;
    content: string;
    ProductId: number
  }
  
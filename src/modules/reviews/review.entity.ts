import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';  // Ensure correct path
import { Product } from '../products/products.entity';  // Ensure correct path
import { User } from '../users/users.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ type: 'int' })
  rating: number;  // Rating scale, e.g., 1-5

  @ManyToOne(() => User, user => user.reviewto)
  userTo: User;

  @ManyToOne(() => User, user => user.reviewfrom)
  userfrom: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

  
}

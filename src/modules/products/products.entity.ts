import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany } from 'typeorm';
  // Ensure correct path
import { Comment } from '../comments/comment.entity';  // Ensure correct path
import { Offer } from '../offers/offer.entity';  // Ensure correct path
import { User } from '../users/users.entity';
import { ProductCategory } from '../product-categories/product-categories.entity';
import { Review } from '../reviews/review.entity';
import { Chat } from '../chats/chat.entity';
import { PRODUCT_STATUS_ENUM } from 'src/enums/product_status.enum';
import { Report } from '../reports/report.entity';
import { Image } from '../image/entities/image.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  price: number;


  @Column({
    type: 'enum',
    enum: PRODUCT_STATUS_ENUM,
    default: PRODUCT_STATUS_ENUM.AVAILABLE, 
  })
  status: PRODUCT_STATUS_ENUM;  

  @Column('text', { array: true, nullable: true })
    image: string[];


  @ManyToOne(() => User, user => user.products)
  user: User;

  @OneToMany(() => Comment, comment => comment.product)
  comments: Comment[];

  @OneToMany(() => Offer, offer => offer.product)
  offers: Offer[];

  @OneToMany(() => Chat, chats => chats.product)
  chats: Chat[];

  @ManyToOne(() => ProductCategory, category => category.products)
  category: ProductCategory;

  @ManyToOne(() => ProductCategory, category => category.productsWant)
  categoryWantId: ProductCategory;

  // @OneToMany(() => Review, review => review.product)
  // reviews: Review[];
  
  @OneToMany(() => Report, (report) => report.product)
  reports: Report[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  
  @OneToMany(() => Review, review => review.product)
  reviews: Review[];
}

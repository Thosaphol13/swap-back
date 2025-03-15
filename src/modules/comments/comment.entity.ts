import { 
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn 
} from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne(() => Product, (product) => product.comments, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Comment, (comment) => comment.replies, { onDelete: 'CASCADE' })  // 👈 Parent comment
  parent: Comment | null;

  @OneToMany(() => Comment, (comment) => comment.parent, { onDelete: 'CASCADE' }) // 👈 Replies
  replies: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}

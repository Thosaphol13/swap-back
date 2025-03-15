import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Offer } from '../offers/offer.entity';
 // Ensure correct path

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @Column({ default: false })
  isRead: boolean;
  @ManyToOne(() => User, user => user.notifications)
  user: User;

  @Column({ nullable: true })
  offerId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

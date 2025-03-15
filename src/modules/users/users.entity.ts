import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Notification } from '../notifications/notification.entity';  // Ensure correct path
import { Comment } from '../comments/comment.entity';
import { Offer } from '../offers/offer.entity';
import { Product } from '../products/products.entity';
import { Report } from '../reports/report.entity';
import { Review } from '../reviews/review.entity';
import { Admin } from '../admins/admin.entity';
import { Chat } from '../chats/chat.entity';
import { Follow } from '../follow/follow.entity';
import { ReportUser } from '../report-users/entities/report-user.entity';
import { Province } from '../provinces/entities/province.entity';
import { Region } from '../region/entities/region.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @ManyToOne(() => Region, { nullable: true, onDelete: 'SET NULL' })
  region: Region;

  @ManyToOne(() => Province, { nullable: true, onDelete: 'SET NULL' })
  province: Province;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ length: 50, nullable: true })
  nickname: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Column({ type: 'enum', enum: ['on', 'off'], default: 'on' })
  status: string;

  @ManyToOne(() => Admin, admin => admin.users)
  admin: Admin;
  
  @OneToMany(() => Product, product => product.user)
  products: Product[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Offer, offer => offer.fromUser)
  sentOffers: Offer[];

  @OneToMany(() => Offer, offer => offer.toUser)
  receivedOffers: Offer[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @OneToMany(() => Review, review => review.userTo)
  reviewto: Review[];

  @OneToMany(() => Review, review => review.userfrom)
  reviewfrom: Review[];

  @OneToMany(() => Chat, chat => chat.sender)
  sentChats: Chat[];

  @OneToMany(() => Chat, chat => chat.receiver)
  receivedChats: Chat[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];

  @OneToMany(() => ReportUser, (report) => report.reportingUser)
  reportsMade: ReportUser[];

  @OneToMany(() => ReportUser, (report) => report.reportedUser)
  reportsReceived: ReportUser[];  // Reports against the user

  @Column({ default: false }) // เพิ่มฟิลด์นี้
  banned: boolean;

}

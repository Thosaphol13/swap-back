import { Product } from 'src/modules/products/products.entity';
import { User } from 'src/modules/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('report_users')
export class ReportUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reportsReceived) // Assuming reports are received too
  reportedUser: User;

  @ManyToOne(() => User, (user) => user.reportsMade)  // Reporting user
  @JoinColumn({ name: 'reporting_user_id' })
  reportingUser: User;

  @Column({ default: false })
  banned: boolean;

  @Column()
  reason: string;  // Reason for the report (e.g., abuse, spam)

  @Column({ type: 'text', nullable: true })
  additionalInfo: string;  // Optional field for additional comments

  @Column({ type: 'boolean', default: false })
  resolved: boolean;  // Whether the report has been resolved or not

  @CreateDateColumn()
  createdAt: Date;  // Timestamp of when the report was created

  // Optionally, you can also add an updatedAt field if you want to track when a report is updated
  @CreateDateColumn()
  updatedAt: Date;  // Timestamp of the last update

  @ManyToOne(() => Product, { nullable: true }) // เพิ่มความสัมพันธ์กับ Product
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

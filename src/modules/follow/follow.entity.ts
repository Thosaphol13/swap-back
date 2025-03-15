import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';


@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  // The user who is following another user
  @ManyToOne(() => User, user => user.following)
  follower: User;
    
  // The user who is being followed
  @ManyToOne(() => User, user => user.followers)
  following: User;
}

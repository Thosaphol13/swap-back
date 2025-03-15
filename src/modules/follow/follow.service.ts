import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';
import { User } from '../users/users.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async follow(userId: number, followUserId: number): Promise<string> {
    const follower = await this.userRepository.findOne({ where: { id: userId } });
    const following = await this.userRepository.findOne({ where: { id: followUserId } });

    if (!follower || !following) {
      throw new Error('User not found');
    }

    const newFollow = this.followRepository.create({ follower, following });
    await this.followRepository.save(newFollow);

    return `User ${userId} followed user ${followUserId}`;
  }

  async unfollow(userId: number, unfollowUserId: number): Promise<string> {
    const follow = await this.followRepository.findOne({
      where: { follower: { id: userId }, following: { id: unfollowUserId } },
    });

    if (!follow) {
      return `User ${userId} is not following user ${unfollowUserId}`;
    }

    await this.followRepository.remove(follow);
    return `User ${userId} unfollowed user ${unfollowUserId}`;
  }

  async getFollowers(userId: number): Promise<User[]> {
    const follows = await this.followRepository.find({
      where: { following: { id: userId } },
      relations: ['follower'],
    });

    return follows.map((follow) => follow.follower);
  }

  async getFollowing(userId: number): Promise<User[]> {
    const follows = await this.followRepository.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });

    return follows.map((follow) => follow.following);
  }
  async isFollowing(userId: number, targetUserId: number): Promise<boolean> {
    const follow = await this.followRepository.findOne({
      where: { follower: { id: userId }, following: { id: targetUserId } },
    });
    return !!follow;
  }
}

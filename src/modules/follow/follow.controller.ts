import { Controller, Post, Delete, Get, Param } from '@nestjs/common';
import { FollowService } from './follow.service';
import { User } from '../users/users.entity';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':userId/follow/:followUserId')
  async follow(@Param('userId') userId: number, @Param('followUserId') followUserId: number): Promise<string> {
    return this.followService.follow(userId, followUserId);
  }

  @Delete(':userId/unfollow/:unfollowUserId')
  async unfollow(@Param('userId') userId: number, @Param('unfollowUserId') unfollowUserId: number): Promise<string> {
    return this.followService.unfollow(userId, unfollowUserId);
  }

  @Get(':userId/followers')
  async getFollowers(@Param('userId') userId: number): Promise<User[]> {
    return this.followService.getFollowers(userId);
  }

  @Get(':userId/following')
  async getFollowing(@Param('userId') userId: number): Promise<User[]> {
    return this.followService.getFollowing(userId);
  }
  @Get(':userId/following/:targetUserId')
  async isFollowing(@Param('userId') userId: number, @Param('targetUserId') targetUserId: number): Promise<boolean> {
    return this.followService.isFollowing(userId, targetUserId);
  }
}

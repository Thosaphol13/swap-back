import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { IChat } from 'src/interface/Chats.interface';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('create')
  async createChat(@Body() createChatDto: IChat) {
    if (!createChatDto.message) {
      throw new Error('Message cannot be empty');
    }
    return this.chatsService.createChat(createChatDto);
  }

  
  @Get('get')
  async getChats(
    @Query('fromUserId') fromUserId: number,
    @Query('toUserId') toUserId: number,
  ) {
    // Call the service method to get chats between users
    const chats = await this.chatsService.getChatsBetweenUsers(fromUserId, toUserId);
    return chats;
  }
  
  @Get('getByProductId/:productId')
  async getChatsByProductId(@Param('productId') productId: number) {
    // Call the service method to get chats by product id
    const chats = await this.chatsService.getChatsByProductId(productId);
    return chats;
  }

}

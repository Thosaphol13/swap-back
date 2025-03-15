import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './chat.entity'; // Ensure correct path
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User])],
  providers: [ChatsService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}

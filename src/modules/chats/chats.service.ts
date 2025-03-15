import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { IChat } from 'src/interface/Chats.interface';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async createChat(createChatDto: IChat): Promise<Chat> {
    const { from_user_id, to_user_id, message, deliveryType, productId } = createChatDto;
  
    if (!message) {
      throw new Error('Message cannot be empty');
    }
  
    const chat = this.chatRepository.create({
      sender: { id: from_user_id },
      receiver: { id: to_user_id },
      message,
      deliveryType,
      product: productId ? { id: productId } : null, // Ensure product relation is optional
    });
  
    return this.chatRepository.save(chat);
  }
  

  async getChats(fromUserId: number, toUserId: number): Promise<any[]> {
    const chats = await this.chatRepository.find({
      where: [
        { sender: { id: fromUserId }, receiver: { id: toUserId } },
        { sender: { id: toUserId }, receiver: { id: fromUserId } },
      ],
      order: { createdAt: 'ASC' },
      relations: ['sender', 'receiver'], // Ensure sender and receiver relations are loaded
    });
  
    // Format the response to include sender and receiver details
    return chats.map((chat) => ({
      id: chat.id,
      message: chat.message,
      createdAt: chat.createdAt,
      sender: {
        id: chat.sender.id,
        firstName: chat.sender.firstName,
        lastName: chat.sender.lastName,
        profilePicture: chat.sender.profilePicture,
      },
      receiver: {
        id: chat.receiver.id,
        firstName: chat.receiver.firstName,
        lastName: chat.receiver.lastName,
        profilePicture: chat.receiver.profilePicture,
      },
    }));
  }
  
  
  async getChatById(id: number) {
    return await this.chatRepository.findOne({
      where: { id },
    });
  }
  async getChatsBetweenUsers(fromUserId: number, toUserId: number): Promise<any[]> {
    const chats = await this.chatRepository.find({
      where: [
        { sender: { id: fromUserId }, receiver: { id: toUserId } },
        { sender: { id: toUserId }, receiver: { id: fromUserId } },
      ],
      order: { createdAt: 'ASC' },
      relations: ['sender', 'receiver'], // Ensure sender and receiver relations are loaded
    });
  
    // Format the response to include sender and receiver details
    return chats.map((chat) => ({
      id: chat.id,
      message: chat.message,
      createdAt: chat.createdAt,
      sender: {
        id: chat.sender.id,
        firstName: chat.sender.firstName,
        lastName: chat.sender.lastName,
        profilePicture: chat.sender.profilePicture,
      },
      receiver: {
        id: chat.receiver.id,
        firstName: chat.receiver.firstName,
        lastName: chat.receiver.lastName,
        profilePicture: chat.receiver.profilePicture,
      },
    }));
  }
  async getChatsByProductId(productId: number): Promise<any[]> {
    const chats = await this.chatRepository.find({
      where: { product: { id: productId } },
      relations: ['sender', 'receiver'], // Ensure sender and receiver relations are loaded
    });
  
    // Format the response to include sender and receiver details
    return chats.map((chat) => ({
      id: chat.id,
      message: chat.message,
      createdAt: chat.createdAt,
      sender: {
        id: chat.sender.id,
        firstName: chat.sender.firstName,
        lastName: chat.sender.lastName,
        profilePicture: chat.sender.profilePicture,
      },
      receiver: {
        id: chat.receiver.id,
        firstName: chat.receiver.firstName,
        lastName: chat.receiver.lastName,
        profilePicture: chat.receiver.profilePicture,
      },
    }));
  }  
}

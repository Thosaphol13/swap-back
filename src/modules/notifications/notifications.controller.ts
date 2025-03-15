// src/modules/notifications/notifications.controller.ts
import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Create a new notification
  @Post()
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  // Get all notifications for a user
  @Get('user/:user_id')
  async getUserNotifications(@Param('user_id') user_id: number) {
    return this.notificationsService.getUserNotifications(user_id);
  }

  // Mark a notification as read
  @Patch(':id/read')
  async markAsRead(@Param('id') id: number) {
    return this.notificationsService.markAsRead(id);
  }
}

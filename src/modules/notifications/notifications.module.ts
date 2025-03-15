import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification } from './notification.entity';  // Ensure correct path
import { User } from '../users/users.entity';
import { Offer } from '../offers/offer.entity';
import { OffersModule } from '../offers/offers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User]),  // Import the necessary entities
    OffersModule,  // Import OffersModule to access OffersService
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}

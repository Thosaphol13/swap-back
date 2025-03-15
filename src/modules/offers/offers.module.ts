import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './offer.entity';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import { NotificationsModule } from '../notifications/notifications.module';
  // Ensure correct path

@Module({
  imports: [TypeOrmModule.forFeature([Offer, User, Product])],
  providers: [OffersService],
  controllers: [OffersController],
  exports: [OffersService],
})
export class OffersModule {}

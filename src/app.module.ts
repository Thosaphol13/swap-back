import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterModule } from './Master.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { FollowModule } from './modules/follow/follow.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MasterModule, NotificationsModule, FollowModule, AuthModule], // Import the MasterModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

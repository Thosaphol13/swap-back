import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Follow } from '../follow/follow.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ReportUser } from '../report-users/entities/report-user.entity';
import { Province } from '../provinces/entities/province.entity';
import { Region } from '../region/entities/region.entity';
import { RegionModule } from '../region/region.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow, ReportUser,Province]), // Register both User and Follow entities
    RegionModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

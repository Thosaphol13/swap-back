import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportUser } from './entities/report-user.entity';
import { User } from '../users/users.entity';
import { ReportUserService } from './report-users.service';
import { ReportUserController } from './report-users.controller';
import { Product } from '../products/products.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ReportUser, User, Product])],
  providers: [ReportUserService],
  controllers: [ReportUserController],
})
export class ReportUserModule {}

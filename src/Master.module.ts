import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductsModule } from './modules/products/products.module';
import { CommentsModule } from './modules/comments/comments.module';
import { OffersModule } from './modules/offers/offers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AdminsModule } from './modules/admins/admins.module';
import { ChatsModule } from './modules/chats/chats.module';
import { ReportUserModule } from './modules/report-users/report-users.module';
import { ImageModule } from './modules/image/image.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { RegionModule } from './modules/region/region.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ❌ เปลี่ยนเป็น false ใน production
    }),
    UsersModule,
    ProductCategoriesModule,
    ProductsModule,
    CommentsModule,
    OffersModule,
    NotificationsModule,
    ReportsModule,
    ReviewsModule,
    AdminsModule,
    ChatsModule,
    ReportUserModule,
    ImageModule,
    // ProvincesModule,
    // RegionModule
    
  ],
})
export class MasterModule {}

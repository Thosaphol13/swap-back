import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province])], // ✅ ต้องเพิ่มตรงนี้
  controllers: [ProvincesController],
  providers: [ProvincesService],
  exports: [TypeOrmModule], // ✅ Export ให้โมดูลอื่นใช้ได้
})
export class ProvincesModule {}

import { Module } from '@nestjs/common';
import { SubdistrictService } from './subdistrict.service';
import { SubdistrictController } from './subdistrict.controller';

@Module({
  controllers: [SubdistrictController],
  providers: [SubdistrictService],
})
export class SubdistrictModule {}

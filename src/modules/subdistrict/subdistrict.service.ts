import { Injectable } from '@nestjs/common';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';

@Injectable()
export class SubdistrictService {
  create(createSubdistrictDto: CreateSubdistrictDto) {
    return 'This action adds a new subdistrict';
  }

  findAll() {
    return `This action returns all subdistrict`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subdistrict`;
  }

  update(id: number, updateSubdistrictDto: UpdateSubdistrictDto) {
    return `This action updates a #${id} subdistrict`;
  }

  remove(id: number) {
    return `This action removes a #${id} subdistrict`;
  }
}

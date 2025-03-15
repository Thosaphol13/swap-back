import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}

  async findOne(id: number): Promise<Admin | undefined> {
    return this.adminsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Admin[]> {
    return this.adminsRepository.find();
  }

  // Add more methods as needed for your service
}

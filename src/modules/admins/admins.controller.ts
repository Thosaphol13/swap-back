import { Controller, Get, Param } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './admin.entity';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get(':id')
  async getAdmin(@Param('id') id: number): Promise<Admin> {
    return this.adminsService.findOne(id);
  }

  @Get()
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminsService.findAll();
  }

  // Add more endpoints as needed for your controller
}

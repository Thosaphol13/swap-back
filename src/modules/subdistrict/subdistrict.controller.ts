import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubdistrictService } from './subdistrict.service';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';

@Controller('subdistrict')
export class SubdistrictController {
  constructor(private readonly subdistrictService: SubdistrictService) {}

  @Post()
  create(@Body() createSubdistrictDto: CreateSubdistrictDto) {
    return this.subdistrictService.create(createSubdistrictDto);
  }

  @Get()
  findAll() {
    return this.subdistrictService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subdistrictService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubdistrictDto: UpdateSubdistrictDto) {
    return this.subdistrictService.update(+id, updateSubdistrictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subdistrictService.remove(+id);
  }
}

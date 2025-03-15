// src/modules/reports/reports.controller.ts
import { Controller, Post, Body, Param, Get, Patch, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { log } from 'node:console';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async reportProduct(
    @Body('productId') productId: number,
    @Body('userId') userId: number,
    @Body('reason') reason: string,
    @Body('details') details?: string
  ) {
    return this.reportsService.reportProduct(productId, userId, reason, details);
  }

  // Get all reports
  @Get()
  async getAllReports() {
    return this.reportsService.getAllReports();
  }

  // Get a report by ID
  @Get(':id')
  async getReportById(@Param('id') id: number) {
    return this.reportsService.getReportById(id);
  }

  // Update report status
  @Patch(':id/status')
  async updateReportStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.reportsService.updateReportStatus(id, status);
  }
}

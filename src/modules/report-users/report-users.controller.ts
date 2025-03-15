import { Controller, Post, Body, Param, Get, Put, ParseIntPipe } from '@nestjs/common';
import { ReportUserService } from './report-users.service';
import { get } from 'http';

@Controller('reportUser')
export class ReportUserController {
  constructor(private readonly reportUserService: ReportUserService) {}

  @Get()
  async getAllReports() {
    return this.reportUserService.getAllReports();
  }

  @Post('create')
  async createReport(
    @Body('reportingUserId') reportingUserId: number,
    @Body('reportedUserId') reportedUserId: number,
    @Body('reason') reason: string,
    @Body('additionalInfo') additionalInfo: string,
    @Body('productId') productId: number
  ) {
    console.log(reportingUserId, reportedUserId, reason, additionalInfo, productId);
    
    return this.reportUserService.createReport(reportingUserId, reportedUserId, reason, additionalInfo, productId);
  }

  @Get(':userId')
  async getReportsForUser(@Param('userId') userId: number) {
    return this.reportUserService.getReportsForUser(userId);
  }

  @Put(':reportId/resolve')
  async resolveReport(@Param('reportId') reportId: number) {
    return this.reportUserService.resolveReport(reportId);
  }
 // In report-users.controller.ts
@Get('has-reported/:reportingUser/:reportedUser/:productId')
async hasUserReportedProduct(
  @Param('reportingUser', ParseIntPipe) reportingUser: number,
  @Param('reportedUser', ParseIntPipe) reportedUser: number,
  @Param('productId', ParseIntPipe) productId: number
): Promise<{ hasReported: boolean }> {
  const hasReported = await this.reportUserService.hasUserReportedProduct(reportingUser, reportedUser,productId);
  return { hasReported };
}



}

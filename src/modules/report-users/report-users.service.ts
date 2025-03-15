import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportUser } from './entities/report-user.entity';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class ReportUserService {
  constructor(
    @InjectRepository(ReportUser)
    private reportUserRepository: Repository<ReportUser>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Create a new report
  async createReport(reportingUserId: number, reportedUserId: number, reason: string, additionalInfo?: string, productId?: number) {
    const reportingUser = await this.userRepository.findOne({ where: { id: reportingUserId } });
    const reportedUser = await this.userRepository.findOne({ where: { id: reportedUserId } });

    if (!reportingUser || !reportedUser) {
      throw new Error('User not found');
    }
    if (reportedUser.banned) {
      throw new Error('This user is already banned');
  }

    const report = new ReportUser();
    report.reportingUser = reportingUser;
    report.reportedUser = reportedUser;
    report.reason = reason;
    report.product = productId ? await this.productsRepository.findOne({ where: { id: productId } }) : null;
    report.additionalInfo = additionalInfo;
    report.resolved = false;

    await this.reportUserRepository.save(report);

    const reportCount = await this.reportUserRepository.count({
      where: { reportedUser: { id: reportedUserId }, resolved: false },
  });

  // ถ้ามีรีพอร์ตครบ 3 ครั้งขึ้นไป -> แบนผู้ใช้
    if (reportCount >= 3) {
        reportedUser.banned = true;
        await this.userRepository.save(reportedUser);
    }
    return report
    // return await this.reportUserRepository.save(report);
  }
  async getReportsForUser(userId: number) {
    return this.reportUserRepository.find({ where: { reportedUser: { id: userId } }, relations: ['reportingUser'] });
  }

  async getAllReports() {
    return this.reportUserRepository.find({ relations: ['reportingUser', 'reportedUser'] });
  }

  // Mark a report as resolved
  async resolveReport(reportId: number) {
    const report = await this.reportUserRepository.findOne({ where: { id: reportId } });
    if (!report) {
      throw new Error('Report not found');
    }

    report.resolved = true;
    return this.reportUserRepository.save(report);
  }
  // In report-users.service.ts
async hasUserReportedProduct(reportingUser: number, reportedUser: number, productId: number): Promise<boolean> {
  const existingReport = await this.reportUserRepository.findOne({ 
    where: { 
      reportingUser: { id: reportingUser }, 
      reportedUser: { id: reportedUser } ,
      product: { id: productId }
    } 
  });
  return !!existingReport;
}
async getReportsForUserBan(userId: number) {
  return this.reportUserRepository.find({
    where: { reportedUser: { id: userId } },
    relations: ['reportingUser', 'reportedUser'],
  });
}

}

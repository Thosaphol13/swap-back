// src/modules/reports/reports.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new report
  async reportProduct(productId: number, userId: number, reason: string, details?: string) {
    const product = await this.productRepository.findOne({ where: { id: productId }, relations: ['reports'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!product) {
      throw new Error('Product not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    const report = this.reportRepository.create({
      reason,
      details,
      status: 'pending',  // Default status can be set here
      product,
      user,
      amount: product.reports ? product.reports.length + 1 : 1,
    });

    await this.reportRepository.save(report);
    return report;
  }

  // Get all reports
  async getAllReports(): Promise<Report[]> {
    return this.reportRepository.find({ relations: ['product', 'user'] });
  }

  // Get a report by ID
  async getReportById(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  // Update report status
  async updateReportStatus(id: number, status: string): Promise<Report> {
    const report = await this.getReportById(id);
    report.status = status;
    return this.reportRepository.save(report);
  }
// Report a product by a user


}

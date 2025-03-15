// src/modules/reports/dto/create-report.dto.ts
export class CreateReportDto {
    user_id: number;
    reason: string;
    details?: string;
    product_id: number;
  }
  
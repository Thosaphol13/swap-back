import { Test, TestingModule } from '@nestjs/testing';
import { ReportUsersService } from './report-users.service';

describe('ReportUsersService', () => {
  let service: ReportUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportUsersService],
    }).compile();

    service = module.get<ReportUsersService>(ReportUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

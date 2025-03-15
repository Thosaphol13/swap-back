import { Test, TestingModule } from '@nestjs/testing';
import { ReportUsersController } from './report-users.controller';
import { ReportUsersService } from './report-users.service';

describe('ReportUsersController', () => {
  let controller: ReportUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportUsersController],
      providers: [ReportUsersService],
    }).compile();

    controller = module.get<ReportUsersController>(ReportUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

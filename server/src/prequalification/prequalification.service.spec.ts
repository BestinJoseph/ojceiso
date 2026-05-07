import { Test, TestingModule } from '@nestjs/testing';
import { PrequalificationService } from './prequalification.service';

describe('PrequalificationService', () => {
  let service: PrequalificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrequalificationService],
    }).compile();

    service = module.get<PrequalificationService>(PrequalificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NcrService } from './ncr.service';

describe('NcrService', () => {
  let service: NcrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NcrService],
    }).compile();

    service = module.get<NcrService>(NcrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

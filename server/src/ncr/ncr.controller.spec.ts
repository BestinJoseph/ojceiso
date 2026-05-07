import { Test, TestingModule } from '@nestjs/testing';
import { NcrController } from './ncr.controller';
import { NcrService } from './ncr.service';

describe('NcrController', () => {
  let controller: NcrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NcrController],
      providers: [NcrService],
    }).compile();

    controller = module.get<NcrController>(NcrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

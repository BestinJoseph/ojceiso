import { Test, TestingModule } from '@nestjs/testing';
import { PrequalificationController } from './prequalification.controller';
import { PrequalificationService } from './prequalification.service';

describe('PrequalificationController', () => {
  let controller: PrequalificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrequalificationController],
      providers: [PrequalificationService],
    }).compile();

    controller = module.get<PrequalificationController>(PrequalificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

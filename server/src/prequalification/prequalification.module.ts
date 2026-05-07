import { Module } from '@nestjs/common';
import { PrequalificationService } from './prequalification.service';
import { PrequalificationController } from './prequalification.controller';

@Module({
  controllers: [PrequalificationController],
  providers: [PrequalificationService]
})
export class PrequalificationModule {}

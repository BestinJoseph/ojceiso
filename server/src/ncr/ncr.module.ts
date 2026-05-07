import { Module } from '@nestjs/common';
import { NcrService } from './ncr.service';
import { NcrController } from './ncr.controller';
import { Ncr } from './entities/ncr.entity';
import { Image } from 'src/image/entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImmediateAction } from './entities/immediate.entity';
import { CorrectiveAction } from './entities/corrective.entity';
import { NcrVerification } from './entities/ncr.verification.entity';
import { Department } from 'src/department/entities/department.entity';
import { ImageService } from 'src/image/image.service';
import { DepartmentService } from 'src/department/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ncr, Image, ImmediateAction, CorrectiveAction, NcrVerification, Department])],
  controllers: [NcrController],
  providers: [NcrService, ImageService, DepartmentService],
  exports: [NcrService]
})
export class NcrModule {}

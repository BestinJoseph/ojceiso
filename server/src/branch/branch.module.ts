import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { DepartmentService } from 'src/department/department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Branch } from './entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Department])],
  controllers: [BranchController],
  providers: [BranchService, DepartmentService],
  exports: [BranchService]
})
export class BranchModule {}

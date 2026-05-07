import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Ncr } from 'src/ncr/entities/ncr.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Training } from 'src/training/entities/training.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Users } from 'src/users/entities/users.entity';
import { Request } from 'src/request/entities/request.entity';
import { Personal } from 'src/profile/entities/personal.entity';
import { Position } from 'src/profile/entities/position.entity';
import { UsersService } from 'src/users/users.service';
import { BranchService } from 'src/branch/branch.service';
import { Branch } from 'src/branch/entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Ncr, Profile, Training, Users, Request, Personal, Position, Branch])],
  controllers: [DepartmentController],
  providers: [DepartmentService, ProfileService, UsersService, BranchService],
  exports: [DepartmentService]
})
export class DepartmentModule {}

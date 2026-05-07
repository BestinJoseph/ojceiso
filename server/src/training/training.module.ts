import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Attendee } from './entities/attendee.entity';
import { Training } from './entities/training.entity';
import { DepartmentService } from 'src/department/department.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { Users } from 'src/users/entities/users.entity';
import { Standard } from 'src/standard/entities/standard.entity';
import { Test } from 'src/test/entities/test.entity';
import { Personal } from 'src/profile/entities/personal.entity';
import { Position } from 'src/profile/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training, Department, Attendee, Profile, Users, Standard, Test, Personal, Position])],
  controllers: [TrainingController],
  providers: [TrainingService, DepartmentService, ProfileService],
  exports: [TrainingService]
})
export class TrainingModule {}

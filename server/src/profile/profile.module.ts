import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Profile } from './entities/profile.entity';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Image } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { DepartmentService } from 'src/department/department.service';
import { Personal } from './entities/personal.entity';
import { Employements } from './entities/employement.entity';
import { Education } from './entities/education.entity';
import { Attendee } from 'src/training/entities/attendee.entity';
import { Training } from 'src/training/entities/training.entity';
import { TrainingService } from 'src/training/training.service';
import { AzureBlobService } from 'src/app/domain/services/azure.blob.service';
import { Position } from './entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Department, Users, Image, Personal, Employements, Education, Attendee, Training, Position])],
  controllers: [ProfileController],
  providers: [ProfileService, UsersService, ImageService, DepartmentService, TrainingService, AzureBlobService],
  exports: [ProfileService]
})
export class ProfileModule {}

import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Request } from './entities/request.entity';
import { UsersService } from 'src/users/users.service';
import { Department } from 'src/department/entities/department.entity';
import { DepartmentService } from 'src/department/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Request, Department])],
  controllers: [RequestController],
  exports: [RequestService],
  providers: [RequestService, UsersService, DepartmentService]
})
export class RequestModule {}

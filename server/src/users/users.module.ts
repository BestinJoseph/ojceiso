import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { JwtRefreshTokenStrategy } from 'src/auth/jwt.refreshtoken.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'src/profile/entities/profile.entity';
import { Personal } from 'src/profile/entities/personal.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Department } from 'src/department/entities/department.entity';
import { Request } from 'src/request/entities/request.entity';
import { RequestService } from 'src/request/request.service';
import { Position } from 'src/profile/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Profile, Personal, Department, Request, Position])],
  providers: [UsersService, JwtService, ProfileService, RequestService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { StandardService } from './standard.service';
import { StandardController } from './standard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from 'src/training/entities/training.entity';
import { Attendee } from 'src/training/entities/attendee.entity';
import { Standard } from './entities/standard.entity';
import { Test } from 'src/test/entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training, Attendee, Standard, Test])],
  controllers: [StandardController],
  providers: [StandardService]
})
export class StandardModule {}

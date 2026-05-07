import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Standard } from 'src/standard/entities/standard.entity';
import { Training } from 'src/training/entities/training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Standard, Training])],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService]
})
export class TestModule {}

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthorizedModule } from './modules/authorized/authorized.module';
import { UnauthorizedModule } from './modules/unauthorized/unauthorized.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { NcrModule } from './ncr/ncr.module';
import { ImageModule } from './image/image.module';
import { ProfileModule } from './profile/profile.module';
import { DepartmentModule } from './department/department.module';
import { MulterModule } from '@nestjs/platform-express';
import { TrainingModule } from './training/training.module';
import { CertificateModule } from './certificate/certificate.module';
import { PrequalificationModule } from './prequalification/prequalification.module';
import { TestModule } from './test/test.module';
import { StandardModule } from './standard/standard.module';
import { SectionModule } from './section/section.module';
import { EquipmentModule } from './equipment/equipment.module';
import { memoryStorage } from 'multer';
import { RequestModule } from './request/request.module';
import { BranchModule } from './branch/branch.module';

@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({ storage: memoryStorage(), dest: './uploads'}),
    AuthorizedModule,
    UnauthorizedModule,
    AuthModule,
    NcrModule,
    ImageModule,
    ProfileModule,
    DepartmentModule,
    TrainingModule,
    CertificateModule,
    PrequalificationModule,
    TestModule,
    StandardModule,
    SectionModule,
    EquipmentModule,
    RequestModule,
    BranchModule,
  ],

})
export class AppModule {}

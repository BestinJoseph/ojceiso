import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (configServices: ConfigService) => ({
                // type: 'mysql',
                // host: configServices.getOrThrow('MYSQL_HOST'),
                // port: configServices.getOrThrow('MYSQL_PORT'),
                // database: configServices.getOrThrow('MYSQL_DATABASE'),
                // username: configServices.getOrThrow('MYSQL_USERNAME'),
                // password: configServices.getOrThrow('MYSQL_PASSWORD'),
                type: 'postgres',
                host: configServices.getOrThrow('PG_HOST'),
                port: configServices.getOrThrow('PG_PORT'), 
                database: configServices.getOrThrow('PG_DATABASE'), 
                username: configServices.getOrThrow('PG_USERNAME'),
                password: configServices.getOrThrow('PG_PASSWORD'),
                autoLoadEntities: true,
                // ssl: true, 
                synchronize: configServices.getOrThrow('PG_SYNCHRONIZE')
            })
        })
    ]
})

export class DatabaseModule {}

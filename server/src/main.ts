import { NestFactory } from '@nestjs/core';
import * as cookieParse from 'cookie-parser'
import { AppModule } from './app.module';

console.log(process.env.FRONT_END_URL)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost', process.env.FRONT_END_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 
    'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true }

  app.enableCors(corsOptions); 
  app.use(cookieParse())
  await app.listen(process.env.PORT_LISTEN);
}
bootstrap();

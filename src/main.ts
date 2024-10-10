import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {

  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'logs/basic.log'
        , // File lưu trữ log
      }),
    ],
  });


  const app = await NestFactory.create(AppModule);

  app.use(express.static("*"))
  app.enableCors()

  await app.listen(8034);
}
bootstrap();
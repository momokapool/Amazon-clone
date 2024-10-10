import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

import { PrismaService } from './prisma/prisma.service';

import * as redisStore from 'cache-manager-redis-store'


import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductController } from './product/product.controller';
import { RedisModule } from './redis/redis.module';

import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticModule } from './elastic/elastic.module';

@Module({
  imports: [CacheModule.register({
    isGlobal: true,
    ttl: 50, // time to life => MILISECOND
    max: 5, // number item in cache
    host:"localhost",
    port:"6379",
    auth_pass:"1234"
    }),
  ProductModule,
  RedisModule,
  ElasticsearchModule.register({
    node:"https://localhost:9200",
    auth:{
      username:"elasticsearch",
      password:"123456"
    },
  }),
  ElasticModule],

  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

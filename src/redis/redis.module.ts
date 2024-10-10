import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';


@Module({imports: [CacheModule.register({
    isGlobal: true,
    ttl: 50, // time to life => MILISECOND
    max: 5, // number item in cache
    host:"localhost",
    port:"6379",
    auth_pass:"1234"
    })]})
export class RedisModule {}

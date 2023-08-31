import { Inject, Logger, Module } from '@nestjs/common';
import { REDIS, } from './redis.constants';
import { createClient } from 'redis';
import { RedisService } from "@src/redis/redis.service";

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: createClient({
        url: 'redis://localhost:6379',
      }),
    },
    RedisService
  ],
  exports: [REDIS],
})
export class RedisModule {}

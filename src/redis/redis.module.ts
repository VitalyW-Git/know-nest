import { Inject, Logger, Module } from '@nestjs/common';
import { REDIS } from './redis.constants';
import { createClient } from 'redis';

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: createClient({
        url: 'redis://localhost:6379',
      }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {
  constructor(@Inject(REDIS) private readonly redis: createClient) {
    redis.on('error', (error) => {
      Logger.error('Could not establish a connection with redis. ' + error);
    });
    redis.on('connect', () => {
      Logger.verbose('Connected to redis successfully', 'Bootstrap');
    });
  }
}

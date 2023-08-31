import { Inject, Injectable } from "@nestjs/common";
import { REDIS, REDIS_CLIENT } from "@src/redis/redis.constants";
import { Redis } from 'ioredis';
import { RedisService as RedisServiceTest } from 'nestjs-redis';
import { createClient, RedisClient } from "redis";

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS) private readonly redisService: RedisServiceTest) {}

  async getSessionValue(sessionId: string, key: string): Promise<any> {
    // const value = await this.redis.hget(`sess:${sessionId}`, key);
    // const redisData = await this.redis.get(`sess:4KmlVtRg09z5gl6G6lvPwuwqoXof-5LO`);
    // const keys = await this.redis.keys('*');
    // const redisClient = this.redisService.getClient();
    // const keys = await redisClient.get(`sess:${sessionId}`);
    const client = createClient();
    const keys = await client.get(`sess:${sessionId}`);
    console.log('keys', keys);
    // console.log('redisData', redisData);
    // console.log('getSessionValue', value);
    return 'getSessionValue';
  }

  // async setSessionValue(sessionId: string, key: string, value: any): Promise<void> {
  //   await this.redis.hset(`sess:${sessionId}`, key, JSON.stringify(value));
  // }
}
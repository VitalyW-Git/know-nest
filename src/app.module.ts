import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisClient } from 'redis';

import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { AuthModule } from '@src/auth';
import { REDIS, RedisModule } from '@src/redis';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConnectDb } from '@src/config/sequelize-connect.db';
import { ConfigService } from '@nestjs/config';
import { configModule } from '@src/config/configure.root';
import { UserModule } from '@src/users/user.module';

@Module({
  imports: [
    configModule,
    SequelizeModule.forRootAsync({
      useFactory: sequelizeConnectDb,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RedisModule,
  ],
  providers: [AppService, Logger],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: process.env.SECRET_KEY,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 600000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

import { configModule } from '@src/config/configure.root';
import { LoggerMiddleware } from '@src/common/middleware/logger.middleware';
import { ProductsModule } from '@src/products/products.module';
import { UsersModule } from '@src/users/users.module';
import { AuthModule } from '@src/auth/auth.module';
import { CatalogOrderModule } from '@src/catalog-order/catalog-order.module';
import { CatalogOrderItemsModule } from '@src/catalog-order-items/catalog-order-items.module';
import { sequelizeConnectDb } from '@src/config/sequelize-connect.db';
import { Module, NestModule, MiddlewareConsumer, Inject } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Logger } from '@nestjs/common';
import * as passport from 'passport';
import { RedisModule } from '@src/redis/redis.module';
import { REDIS } from '@src/redis/redis.constants';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';
import * as session from 'express-session';

@Module({
  imports: [
    configModule,
    SequelizeModule.forRootAsync({
      useFactory: sequelizeConnectDb,
      inject: [ConfigService],
    }),
    RedisModule,
    PassportModule,
    AuthModule,
    ProductsModule,
    UsersModule,
    CatalogOrderModule,
    CatalogOrderItemsModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: createClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(
        session({
          store: new (connectRedis(session))({
            client: this.redis,
            logErrors: true,
          }),
          secret: '514d1dd4ccdd1',
          saveUninitialized: false,
          resave: false,
          cookie: {
            secure: true,
            sameSite: 'strict',
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 3,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

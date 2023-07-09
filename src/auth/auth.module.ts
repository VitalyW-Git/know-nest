import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModel } from '@src/users/models/user.model';
import { UsersService } from '@src/users/services/users.service';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { SerializationProvider } from './serialization.provider';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from '@src/auth/auth.controller';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    SequelizeModule.forFeature([UserModel]),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    LocalStrategy,
    SerializationProvider,
    AuthService,
    JwtService,
  ],
  exports: [UsersService],
})
export class AuthModule {}
// export class AuthModule {
//   configure(consumer: MiddlewareConsumer) {
//     const RedisStore = connectRedis(session);
//
//     consumer.apply(
//       session({
//         secret: 'secret-key',
//         resave: false,
//         saveUninitialized: false,
//         store: new RedisStore({ client: redisClient }),
//       }),
//     );
//   }
// }

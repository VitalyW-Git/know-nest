import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModel } from '@src/users/models/user.model';
import { UsersService } from '@src/users/services/users.service';
import { LocalStrategy } from '@src/auth/strategy/local.strategy';
import { AuthService } from '@src/auth/services/auth.service';
import { SerializationProvider } from './providers/serialization.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from '@src/auth/controllers/auth.controller';
import { JwtStrategy } from '@src/auth/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from "@src/redis/redis.module";
import { RedisService } from "@src/redis/redis.service";


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    SequelizeModule.forFeature([UserModel]),
    JwtModule.register({
      secret: `0dd8d1d7c673300e0e800e10e13eb6ee1414c140e046ebf7e2229010ab7ab79a10f06fddeebabfb428b6a380aa12654c`,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
    RedisModule
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    RedisService,
    LocalStrategy,
    JwtStrategy,
    SerializationProvider,
  ],
  exports: [PassportModule],
  // exports: [UsersService, JwtModule],
})
export class AuthModule {}

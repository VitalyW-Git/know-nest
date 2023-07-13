import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModel } from '@src/users/models/user.model';
import { UsersService } from '@src/users/services/users.service';
import { LocalStrategy } from '@src/auth/strategy/local.strategy';
import { AuthService } from '@src/auth/services/auth.service';
import { SerializationProvider } from './providers/serialization.provider';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from '@src/auth/controllers/auth.controller';
import { LocalAuthGuard } from '@src/auth/guards/local-auth.guard';
import { AuthenticatedGuard } from '@src/auth/guards/authenticated.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { options } from '@src/config/jwt-module-async-options';
import { JwtStrategy } from '@src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    // PassportModule,
    PassportModule.register({
      session: true,
    }),
    SequelizeModule.forFeature([UserModel]),
    // JwtModule.register({
    //   secret: `key_secretJwt`,
    //   signOptions: {
    //     expiresIn: '60s',
    //   },
    // }),
    // JwtModule.registerAsync(options()),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: process.env.very_secret,
        signOptions: {
          expiresIn: process.env.JWT_EXP,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    AuthenticatedGuard,
    LocalAuthGuard,
    SerializationProvider,
  ],
  exports: [UsersService, JwtModule],
})
export class AuthModule {}

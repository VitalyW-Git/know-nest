import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModel } from '@src/users/models/user.model';
import { UsersService } from '@src/users/services/users.service';
import { LocalStrategy } from '@src/auth/strategy/local.strategy';
import { AuthService } from '@src/auth/services/auth.service';
import { SerializationProvider } from './providers/serialization.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from '@src/auth/controllers/auth.controller';
import { LocalAuthGuard } from '@src/auth/guards/local-auth.guard';
import { AuthenticatedGuard } from '@src/auth/guards/authenticated.guard';
import { JwtStrategy } from '@src/auth/strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    SequelizeModule.forFeature([UserModel]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '1h' },
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

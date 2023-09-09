import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@src/auth/auth.controller';
import { AuthService } from '@src/auth/service/auth.service';
import { LocalStrategy } from '@src/auth/strategy/local.strategy';
import { AuthSerializer } from '@src/auth/serialization/serialization.provider';
import { UserService } from '@src/users/services/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '@src/users/models/user.model';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    SequelizeModule.forFeature([UserModel]),
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer, UserService],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserModel } from './models/user.model';
import { LocalGuard } from '@src/auth/guard/local.guard';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService, LocalGuard],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([UserModel])],
})
export class UsersModule {}

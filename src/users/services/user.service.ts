import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserModel } from '@src/users/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserInterface } from '@src/users/interface/login-user.interface';
import { CreateUseInterface } from '@src/users/interface/create-use.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  @InjectModel(UserModel)
  private readonly userModel: typeof UserModel;

  async findAll() {
    return await this.userModel.findAll();
  }

  async findById(id: number): Promise<Omit<UserModel, 'password'>> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOne(user: any): Promise<Omit<UserModel, 'password'>> {
    return await this.userModel.findOne({
      where: {
        id: user.id,
      },
    });
  }

  findOneName(username: string) {
    return this.userModel.findOne({
      where: { username },
    });
  }

  async findOneEmail(userEmail: string) {
    console.log('findOneEmail', userEmail);
    return await this.userModel.findOne({
      where: { email: userEmail },
    });
  }

  async createUser(
    newUser: Omit<CreateUseInterface, 'confirmationPassword'>,
  ): Promise<UserModel> {
    return await this.userModel.create(newUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

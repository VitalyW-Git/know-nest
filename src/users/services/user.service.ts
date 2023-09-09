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

  async validateUser(
    LoginUser: LoginUserInterface,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.findOneEmail(LoginUser.email);
    console.log('findOneEmail', user);
    if (!user) {
      return null;
    }
    if (!(await user.checkPassword(LoginUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    console.log('validateUser checkPassword', user.dataValues);
    return user;
  }

  async registerUser(user: CreateUseInterface): Promise<UserModel> {
    console.log('registerUser', user);
    const existingUser = await this.findOneEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('User email must be unique');
    }
    if (user.password !== user.confirmationPassword) {
      throw new BadRequestException(
        'Password and Confirmation Password must match',
      );
    }
    const { confirmationPassword: _, ..._newUser } = user;
    const newUser: Omit<CreateUseInterface, 'confirmationPassword'> = {
      ..._newUser,
      password: await hash(user.password, 12),
    };
    console.log('registerUser', newUser);
    return await this.createUser(newUser);
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

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@src/users/services/user.service';
import { LoginUserInterface } from '@src/users/interface/login-user.interface';
import { UserModel } from '@src/users/models/user.model';
import { CreateUseInterface } from '@src/users/interface/create-use.interface';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(
    LoginUser: LoginUserInterface,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.findOneEmail(LoginUser.email);
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
    const existingUser = await this.userService.findOneEmail(user.email);
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
    return await this.userService.createUser(newUser);
  }
}

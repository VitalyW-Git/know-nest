import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@src/users/services/users.service';
import { UserModel } from '@src/users/models/user.model';
import { RegistrationUserDto } from '@src/users/dto/registration-user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // public login(user: any): string {
  //   const payload = { id: user.id, username: user.username, role: user.role };
  //   const token = this.jwtService.sign(payload, { secret: `key_secretJwt` });
  //   console.log(token);
  //   return this.jwtService.sign(payload);
  // }

  async test() {
    const payload = { username: 'name' };
    console.log(payload);
    console.log(process.env.JWT_SECRET);
    const test = this.jwtService.sign(payload, { secret: 'vhfbvhbbjx' });
    console.log(test);
    return test;
  }

  createToken(user: any): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return { payload };
  }

  async registerUser(
    user: RegistrationUserDto,
  ): Promise<Omit<UserModel, 'password'>> {
    const existingUser = await this.userService.findOneEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('User Email must be unique', 'UserModel');
    }
    const newUser: RegistrationUserDto = {
      ...user,
      password: await hash(user.password, 12),
    };
    return await this.userService.createUser(newUser);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.findOneName(username);
    if (!user) {
      return null;
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    return user;
  }
}

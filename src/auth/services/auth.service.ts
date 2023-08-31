import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@src/users/services/users.service';
import { UserModel } from '@src/users/models/user.model';
import { RegistrationUserDto } from '@src/users/dto/registration-user.dto';
import { createClient } from 'redis';
import { hash } from 'bcrypt';

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
    console.log('test', payload);
    console.log('test JWT_SECRET', '514d1dd4ccdd1');
    const test = this.jwtService.sign(payload, { secret: 'vhfbvhbbjx' });
    console.log('testsign', test);
    return test;
  }

  createToken(user: any): string {
    const payload = { username: user.username, sub: user.email, id: user.id };
    console.log('createToken', payload);
    return this.jwtService.sign(payload, { secret: '514d1dd4ccdd1' });
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
    email: string,
    password: string,
  ): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.findOneEmail(email);
    if (!user) {
      return null;
    }
    // const isPasswordValid = await compare(password, user.password);
    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    return user;
  }

  async getSession(sessionId: string): Promise<any> {
    // Получение сессии из Redis
    const client = createClient();
    const sessionData = await client.get(sessionId);
    console.log('getSession', sessionData);
    return JSON.parse(sessionData);
  }
}

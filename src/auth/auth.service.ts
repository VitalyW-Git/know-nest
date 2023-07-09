import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@src/users/services/users.service';
import { UserModel } from '@src/users/models/user.model';
import { RegistrationUserDto } from '@src/users/dto/registration-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserModel) {
    const payload = { username: user.name, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
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

  async getUserById(userId: number) {
    return this.userService.findOne(userId);
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@src/users/services/users.service';
import { UserModel } from '@src/users/models/user.model';
import { RegistrationUserDto } from '@src/users/dto/registration-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  @Inject(UsersService)
  private readonly userService: UsersService;
  // constructor(
  //   private readonly userService: UsersService,
  //   private readonly JWT: JWT,
  // ) {}

  public login(user: any): string {
    const payload = { id: user.id, name: user.name, role: user.role };
    const token = this.jwtService.sign(payload, { secret: `key_secretJwt` });
    console.log(token);
    return this.jwtService.sign(payload);
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

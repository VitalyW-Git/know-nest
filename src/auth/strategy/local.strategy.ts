import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/services/users.service';
import { compare } from 'bcrypt';
import { AuthService } from '@src/auth/services/auth.service';
import { UserModel } from '@src/users/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {
    super();
  }

  async validate(name: string, password: string): Promise<UserModel> {
    const user = await this.userService.findOneName(name);
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

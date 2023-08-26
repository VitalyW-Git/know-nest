import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/services/users.service';
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

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<UserModel, 'password'>> {
    console.log('LocalStrategy', username);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

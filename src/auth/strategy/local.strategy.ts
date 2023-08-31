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
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<UserModel, 'password'>> {
    console.log('LocalStrategy', email, password);
    const user = await this.authService.validateUser(email, password);
    console.log('LocalStrategy email', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@src/auth/service/auth.service';
import { UserService } from '@src/users/services/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    console.log('LocalStrategy email', email);
    console.log('LocalStrategy password', password);
    return this.userService.validateUser({ email, password });
  }
}

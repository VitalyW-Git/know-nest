import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from '@src/auth/service/auth.service';
import { UserService } from '@src/users/services/user.service';
import { CreateUseInterface } from '@src/users/interface/create-use.interface';
import { UserModel } from '@src/users/models/user.model';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }
  serializeUser(
    user: UserModel,
    done: (err: Error, user: { id: number; role: string }) => void,
  ) {
    console.log('serializeUser', user);
    done(null, { id: user.id, role: user.role });
  }

  async deserializeUser(
    payload: { id: number; role: string },
    done: (err: Error, user: Omit<UserModel, 'password'>) => void,
  ) {
    const user = await this.userService.findById(payload.id);
    if (!user) {
      throw new BadRequestException(`No user found with id ${payload.id}`);
    }
    console.log('deserializeUser', user.dataValues);
    done(null, user);
  }
}

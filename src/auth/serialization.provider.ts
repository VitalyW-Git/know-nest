import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '@src/users/services/users.service';
import { UserModel } from '@src/users/models/user.model';

@Injectable()
export class SerializationProvider extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(
    user: UserModel,
    done: (err: Error, user: { id: number }) => void,
  ): any {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: { id: number },
    done: (err: Error, user: Omit<UserModel, 'password'>) => void,
  ): Promise<any> {
    const foundUser = await this.usersService.findOne(payload.id);
    done(null, foundUser);
  }
}

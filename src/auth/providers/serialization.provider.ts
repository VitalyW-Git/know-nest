import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    done: (
      err: Error,
      user: { id: number; role: string; name: string },
    ) => void,
  ): any {
    try {
      if (user) {
        return done(null, {
          id: user.id,
          role: user.role,
          name: user.name,
        });
      }
      return done(new BadRequestException('Error user authenticated'), null);
    } catch (e) {
      return done(new BadRequestException(e), null);
    }
  }

  async deserializeUser(
    payload: { id: number },
    done: (err: Error, user: Omit<UserModel, 'password'>) => void,
  ): Promise<any> {
    try {
      if (payload.id) {
        const foundUser = await this.usersService.findOne(payload.id);
        return done(null, foundUser);
      }
      return done(new UnauthorizedException('Error user authenticated'), null);
    } catch (err) {
      return done(new BadRequestException(err), null);
    }
  }
}

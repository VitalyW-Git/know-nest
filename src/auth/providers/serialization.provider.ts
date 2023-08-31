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
      user: { id: number; username: string },
    ) => void,
  ): any {
    console.log('serializeUser', user);
    try {
      if (user) {
        return done(null, {
          id: user.id,
          username: user.username,
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
    console.log('deserializeUser', payload);
    try {
      if (payload.id) {
        const foundUser = await this.usersService.findOne(payload);
        return done(null, foundUser);
      }
      return done(new UnauthorizedException('Error user authenticated'), null);
    } catch (err) {
      return done(new BadRequestException(err), null);
    }
  }

  /*serializeUser(
    user: UserModel,
    done: (err: Error | null, id?: UserModel) => void,
  ): void {
    console.log('serializeUser', user)
    done(null, user);
  }

  deserializeUser(
    payload: unknown,
    done: (err: Error | null, payload?: unknown) => void,
  ): void {
    console.log('deserializeUser', payload)
    done(null, payload);
  }*/
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { UserModel } from '@src/users/models/user.model';
import { AuthService } from '@src/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<UserModel>,
  ): Observable<UserModel> {
    return next.handle().pipe(
      map(user => {
        const response = context.switchToHttp().getResponse<Response>();
        const token = this.authService.createToken(user);
        console.log('token', token)

        response.setHeader('Authorization', `Bearer ${token}`);
        response.cookie('token', token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        return user;
      }),
    );
  }
}

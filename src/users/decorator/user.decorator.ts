import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { UserModel } from '@src/users/models/user.model';

export const AuthUser = createParamDecorator(
  (data: keyof UserModel, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<Request>().user as UserModel;
    console.log('AuthUser', user);
    return data ? user && user[data] : user;
  },
);
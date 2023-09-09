import { ExecutionContext, Injectable } from '@nestjs/common';

import { LoggedInGuard } from '@src/auth/guard/logged-in.guard';

@Injectable()
export class UserGuard extends LoggedInGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    console.log('UserGuard', req);
    console.log('UserGuard session', req.session);
    return (
      super.canActivate(context) && req.session.passport.user.role === 'user'
    );
  }
}

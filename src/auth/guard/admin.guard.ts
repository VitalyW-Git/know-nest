import { ExecutionContext, Injectable } from '@nestjs/common';

import { LoggedInGuard } from '@src/auth/guard/logged-in.guard';

@Injectable()
export class AdminGuard extends LoggedInGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    console.log('AdminGuard', req);
    console.log('AdminGuard user', req.user);
    console.log('AdminGuard session', req.session);
    return (
      super.canActivate(context) && req.session.passport.user.role === 'admin'
    );
  }
}

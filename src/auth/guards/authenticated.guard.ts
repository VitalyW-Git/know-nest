import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/*export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.isAuthenticated()) {
      return true;
    }
    console.log(request);
    throw new UnauthorizedException('User is not authenticated');
  }
}*/

export class AuthenticatedGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Implement any additional logic if needed
    console.log(context);
    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info) {
    console.log(user);
    if (err) {
      throw new UnauthorizedException('User is not authenticated');
    }
    return user;
  }
}

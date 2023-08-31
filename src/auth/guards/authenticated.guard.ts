import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from "@src/auth/services/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { RedisService } from "@src/redis/redis.service";

/*@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // const value = await this.redisService.getSessionValue(request.sessionId, '514d1dd4ccdd1');
    // console.log(value);
    if (request.isAuthenticated()) {
      return true;
    }
    throw new UnauthorizedException('User is not authenticated');
  }
}*/

/*export class AuthenticatedGuard extends AuthGuard('local') {
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
}*/

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('request: ', request.session.userId);
    if (!request.session.userId) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
    return true;
  }
}

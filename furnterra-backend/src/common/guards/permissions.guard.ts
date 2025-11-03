import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === 'owner') {
      return true;
    }

    const usePermissions = user?.permissions || [];

    const hasPermissions = requiredPermissions.every((permission) => {
      return usePermissions.includes(permission);
    });

    if (!hasPermissions) {
      throw new ForbiddenException('insufficient permissions');
    }

    return true;
  }
}

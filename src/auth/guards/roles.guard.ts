/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../roles.decorator';

/**
 * Guard para protección de rutas según roles dinámicos.
 * 
 * - Lee los roles requeridos desde el decorador @Roles().
 * - Compara contra los roles activos del usuario cargados por JwtStrategy.
 * - Permite o bloquea el acceso según coincidencia.
 * 
 * @see roles.decorator.ts
 * @see JwtStrategy.validate
 */
@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    const userRoles = user?.roles || [];

    return requiredRoles.some(role => userRoles.includes(role));

  }
}

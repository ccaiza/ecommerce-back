import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/common/constantes/constants';
import { UsersService } from 'src/servicios/users/users.service';

/**
 * Estrategia JWT para autenticación de usuarios.
 * 
 * - Extrae el token desde el header Authorization (Bearer).
 * - Valida el token usando la clave secreta definida en jwtConstants.
 * - Recupera el usuario desde la base de datos y verifica que tenga roles activos.
 * - Retorna un objeto enriquecido con roles para que el RolesGuard pueda proteger rutas.
 * 
 * @see AuthModule
 * @see UsersService.obtenerUsuarioConRolesActivos
 * @see RolesGuard
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly usuarioServicio: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * @see login
   * @param payload 
   * @returns 
   */
  async validate(payload: any) {
    // return { userId: payload.sub, username: payload.name };
    const usuario = await this.usuarioServicio.obtenerUsuarioConRolesActivos(payload.correo);

    if (!usuario) {
      throw new UnauthorizedException(`Usuario con correo ${payload.correo} no encontrado o sin roles activos.`);
    }

    return {
      userId: usuario.id,
      username: usuario.nombre,
      correo: usuario.email,
      roles: usuario.usuarioRoles.map(ur => ur.rolId.id), //['ROL_ADMIN', 'ROL_CONDUCTOR']
    };

  }
}

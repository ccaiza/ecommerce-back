import { SetMetadata } from '@nestjs/common';
/**
 * Decorator para definir los roles permitidos en un endpoint.
 * 
 * - Usa metadata con la clave 'roles'.
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

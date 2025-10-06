/**
 * Lista de roles del sistema.
 * Necesario para el decorador @Roles()
 * y el guard RolesGuard.
 */
export enum RolesEnum {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = 'ROLE_ESTUDIANTE',
    ROLE_CONDUCTOR = 'ROLE_CONDUCTOR'
}
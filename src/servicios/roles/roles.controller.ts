/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from 'src/common/dto/rol.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

/**
 * Implementa los endpoint.
 */
@Controller('roles')
export class RolesController {

    constructor(private readonly rolServicio: RolesService) { }

    /**
     * Permite crear un rol.
     * @param rol Rol
     * @returns Rol
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    public crearRol(@Body() rol: CreateRolDto) {
        return this.rolServicio.crear(rol);
    }
}

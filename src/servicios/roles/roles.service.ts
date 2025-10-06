/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { CreateRolDto } from 'src/common/dto/rol.dto';
import { Rol } from 'src/conexion/entidad/rol.entity';
import { Repository } from 'typeorm';

/**
 * Servicio de roles.
 */
@Injectable()
export class RolesService {

    constructor(@Inject('ROL_REPOSITORY')
    private rolRepository: Repository<Rol>) { }

    /**
     * Permite crear un nuevo rol.
     * @param rol Rol
     * @returns ROl
     */
    async crear(rol: CreateRolDto): Promise<Rol> {
        const rr = this.rolRepository.create(rol); // instancia real de User
        return await this.rolRepository.save(rr);
    }
}

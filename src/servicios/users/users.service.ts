import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from 'src/common/dto/user.dto';
import { User } from 'src/conexion/entidad/user.entity';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class UsersService {

    constructor(@Inject('USER_REPOSITORY')
    private userRepository: Repository<User>) { }

    /**
     * 
     * @param usuario Usuario
     * @returns 
     */
    async crear(usuario: User): Promise<User> {
        const user = this.userRepository.create(usuario); // instancia real de User
        return await this.userRepository.save(user);
    }

    async listar() {
        return this.userRepository.find();
    }

    /**
     * Actualiza un usuario.
     * @param usuario Usuario
     * @returns UpdateUserDto
     */
    async actualizar(usuario: UpdateUserDto): Promise<UpdateUserDto> {
        const resultado: UpdateResult = await this.userRepository.update(usuario.id, usuario);

        if (resultado.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${usuario.id} no fue encontrado`);
        }

        return usuario;

    }
}

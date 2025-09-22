import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/conexion/dto/user.dto';
import { User } from 'src/conexion/entidad/user.entity';
import { Repository } from 'typeorm';

/**
 * Clase encargada del login de la app.
 */
@Injectable()
export class AuthService {

    constructor(@Inject('USER_REPOSITORY')
    private userRepository: Repository<User>) {

    }

    /**
     * Guarda un usuario a partir del dto.
     * @param usuario CreateUserDto
     * @returns User
     */
    async regitrar(usuario: CreateUserDto): Promise<User | HttpException> {
        // Verificar si existe un usuario con ese correo
        //es necesario el await sino no puedo tomar el valor
        const existe = await this.userRepository.existsBy({ email: usuario.email });
        if (existe) {
            return new HttpException(`El correo ${usuario.email}, ya se encuentra registrado.`, HttpStatus.CONFLICT);
        }
        const tel = await this.userRepository.existsBy({telefono:usuario.telefono});
        if (tel) {
            return new HttpException(`El Telefono ${usuario.telefono}, ya se encuentra registrado.`, HttpStatus.CONFLICT);
        }
        const user = this.userRepository.create(usuario);
        return this.userRepository.save(user);
    }
}

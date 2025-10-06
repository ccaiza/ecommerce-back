import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/common/dto/login.dto';
import { User } from 'src/conexion/entidad/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


/**
 * Clase encargada del login de la app.
 */
@Injectable()
export class AuthService {

    constructor(@Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {

    }

    /**
     * Login de usuario.
     * @param login Datos de login
     * @returns User
     */
    async login(login: LoginDto): Promise<{ access_token: string } | HttpException> {
        const usuario = await this.userRepository.findOneBy({ email: login.correo });
        if (!usuario) {
            return new HttpException(`No existe el usuariocon correo ${login.correo}.`, HttpStatus.NOT_FOUND);
        }
        const iguales = await compare(login.password, usuario.password);
        if (!iguales) {
            return new HttpException(`Clave incorrecta.`, HttpStatus.FORBIDDEN);
        }
        const payload = { sub: usuario.id, correo: usuario.email, name: usuario.nombre };
        const token = this.jwtService.sign(payload);

        return { access_token: token };

    }
}

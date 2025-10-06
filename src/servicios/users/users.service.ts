import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';
import { Rol } from 'src/conexion/entidad/rol.entity';
import { User } from 'src/conexion/entidad/user.entity';
import { UsuarioRol } from 'src/conexion/entidad/usuarioRol.entity';
import { In, Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';

/**
 * Implementa la logica de negocio de usuarios.
 */
@Injectable()
export class UsersService {

    constructor(
        @Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>,
        @Inject('ROL_REPOSITORY') private readonly rolRepository: Repository<Rol>,
        @Inject('USUARIO_ROL_REPOSITORY') private readonly usurioRolRepository: Repository<UsuarioRol>,
    ) { }

    /**
     * Guarda un usuario a partir del dto.
     * Es obligatorio que el correo y telefono sean unicos y que el usuario tenga un rol.
     * @param usuario CreateUserDto
     * @returns User
     */
    async regitrar(usuario: CreateUserDto): Promise<User | HttpException> {
        // Verificar si existe un usuario con ese correo
        //es necesario el await sino no puedo tomar el valor
        const existe = await this.userRepository.existsBy({ email: usuario.email });
        if (existe) {
            throw new HttpException(`El correo ${usuario.email}, ya se encuentra registrado.`, HttpStatus.CONFLICT);
        }
        const tel = await this.userRepository.existsBy({ telefono: usuario.telefono });
        if (tel) {
            throw new HttpException(`El Telefono ${usuario.telefono}, ya se encuentra registrado.`, HttpStatus.CONFLICT);
        }
        //vamos a buscar los roles
        const roles: Rol[] = await this.rolRepository.findBy({ id: In(usuario.rolId) });
        if (roles.length === 0) {
            throw new HttpException(`No se encontraron roles válidos.`, HttpStatus.BAD_REQUEST);
        }
        const user = this.userRepository.create(usuario);
        const nuevoUsuario = await this.userRepository.save(user);

        // Asociar roles
        const relaciones: UsuarioRol[] = roles.map(rol => {
            const ur = new UsuarioRol();
            ur.usuarioId = nuevoUsuario;
            ur.rolId = rol;
            ur.estado = true;
            return ur;
        });

        await this.usurioRolRepository.save(relaciones);

        return nuevoUsuario;

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

    /**
     * Obtiene un usuario con roles activos.
     * @param correo Correo del usuario
     * @returns User | null
     */
    async obtenerUsuarioConRolesActivos(correo: string): Promise<User | null> {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.usuarioRoles', 'usuarioRol')
            .leftJoinAndSelect('usuarioRol.rolId', 'rol')
            .where('user.email = :correo', { correo })
            .andWhere('rol.estado = true')
            .getOne();
    }
}

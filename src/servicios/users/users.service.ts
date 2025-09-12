import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/conexion/entidad/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@Inject('USER_REPOSITORY')
    private userRepository: Repository<User>) {}

    async crear(usuario:User): Promise<User> {
        return this.userRepository.save(usuario);
    }
}

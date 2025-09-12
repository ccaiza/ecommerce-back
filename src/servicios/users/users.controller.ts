import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/conexion/entidad/user.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(private readonly usuarioServicio: UsersService) {}

    @Post()
    public crearUsuario(@Body() user: User) {
        return this.usuarioServicio.crear(user);
    }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/conexion/entidad/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('users')
export class UsersController {

    constructor(private readonly usuarioServicio: UsersService) {}

    @Post()
    public crearUsuario(@Body() user: User) {
        return this.usuarioServicio.crear(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async listar(){
        return this.usuarioServicio.listar();
    }
}

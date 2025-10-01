import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/conexion/entidad/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from 'src/common/dto/user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly usuarioServicio: UsersService) {}

    @Post()
    public crearUsuario(@Body() user: User) {
        return this.usuarioServicio.crear(user);
    }

    /**
     * 
     * @param user Usuario
     * @returns UpdateUserDto
     */
    @UseGuards(JwtAuthGuard)
    @Put()
    public actualizarUsuario(@Body() user: UpdateUserDto) {
        return this.usuarioServicio.actualizar(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async listar(){
        return this.usuarioServicio.listar();
    }
}

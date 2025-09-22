import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/conexion/dto/user.dto';
import { User } from 'src/conexion/entidad/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServicio: AuthService) { }

    /**
     * Permite registrar un usuario.
     * @param user CreateUserDto
     * @returns 
     */
    @Post('registro')
    public async crearUsuario(@Body() user: CreateUserDto): Promise<User | HttpException> {
        return await this.authServicio.regitrar(user);
    }
}

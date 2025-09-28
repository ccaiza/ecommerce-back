import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/common/dto/user.dto';
import { User } from 'src/conexion/entidad/user.entity';
import { LoginDto } from 'src/common/dto/login.dto';

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

    /**
     * Login de usuario.
     * @param user Datos de login
     * @returns JWT
     */
    @Post('login')
    public async login(@Body() user: LoginDto): Promise<{ access_token: string } | HttpException> {
        return await this.authServicio.login(user);
    }
}

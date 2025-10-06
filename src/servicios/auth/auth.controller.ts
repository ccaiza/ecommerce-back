import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/common/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServicio: AuthService) { }

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

import { Body, Controller, FileTypeValidator, Get, HttpException, MaxFileSizeValidator, ParseFilePipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/conexion/entidad/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

/**
 * Implementa los endpoint.
 */
@Controller('users')
export class UsersController {

    constructor(private readonly usuarioServicio: UsersService) { }

    /**
    * Permite registrar un usuario.
    * @param user CreateUserDto
    * @returns 
    */
    @Post('registro')
    public async crearUsuario(@Body() user: CreateUserDto): Promise<User | HttpException> {
        return await this.usuarioServicio.regitrar(user);
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

    /**
     * Lista todos los usuarios.
     * @returns User[]
     */
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('ROLE_ADMIN')
    @Get()
    public async listar() {
        return this.usuarioServicio.listar();
    }

    /**
     * Actualiza la imagen de perfil del usuario.
     * @param body {id:number}
     * @param file Archivo de imagen
     * @returns Usuario
     */
    @UseGuards(JwtAuthGuard)
    @Post('updateImagen')
    @UseInterceptors(
        FileInterceptor('file'))
    public async uploadFile(
        @Body() body: { id: number },
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }), // 4MB
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ]
            })
        ) file: Express.Multer.File) {
        console.log(file);
        const base64Image = file.buffer.toString('base64');
        const mimeType = file.mimetype; // e.g., image/png

        const base64String = `data:${mimeType};base64,${base64Image}`;
        let user = new UpdateUserDto();
        user.id = body.id;
        user.imagen = base64String;

        return this.usuarioServicio.actualizar(user);

    }
}

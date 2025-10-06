import { IsBoolean, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

/**
 * DTO para crear un rol
 */
export class CreateRolDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(15, { message: 'El nombre no puede ser mayor de 50 caracteres' })
    @MinLength(3, { message: 'El nombre no puede ser menor de 3 caracteres' })
    id: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50, { message: 'El nombre no puede ser mayor de 50 caracteres' })
    @MinLength(3, { message: 'El nombre no puede ser menor de 3 caracteres' })
    nombre: string;
    @IsNotEmpty()
    @IsBoolean({ message: 'El campo estado debe ser verdadero o falso' })
    estado: boolean;

}


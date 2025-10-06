import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

/**
 * DTO para crear un usuario
 */
export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'La clave no puede ser menor de 6 caracteres' })
  password: string;

  @IsArray({ message: 'rolId debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'rolId no puede estar vacío' })
  @IsString({ each: true, message: 'Cada rolId debe ser un string' })
  @MinLength(3, { each: true, message: 'Cada rolId debe tener minimo 3 letras' })
  rolId: string[];

  @IsNotEmpty()
  @IsBoolean({ message: 'El campo estado debe ser verdadero o falso' })
  estado: boolean;

}

/** 
 * DTO para actualizar un usuario
 */
export class UpdateUserDto {

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  notificacionToken?: string;
}

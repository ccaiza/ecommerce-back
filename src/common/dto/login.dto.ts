import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Clase encargada de transferir informacion entre el front y el back.
 * @author ccaiza
 */
export class LoginDto {

    @IsNotEmpty({ message: "Ingrese el correo" })
    @IsEmail({}, { message: "Ingrese un correo" })
    public correo: string;

    @IsNotEmpty({ message: "Ingrese la clave" })
    public password:string;
}

import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty()
    usuario_nombre: string;

    @IsNotEmpty()
    usuario_apellido: string;

    @IsEmail()
    usuario_email: string;

    @IsNotEmpty()
    @MinLength(6)
    usuario_password: string;

    @IsNotEmpty()
    rol_Id: number; // ID del rol asociado
   
}
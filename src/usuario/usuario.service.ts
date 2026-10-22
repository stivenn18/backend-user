import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { RolEntity } from 'src/rol/entity/rol.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';



@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
    ) {}

    //crear usuario
async createusuario(usuarioDto: CreateUsuarioDto): Promise<{message: string}> {

    const rol = await this.rolRepository.findOne({ where: { rol_id: usuarioDto.rol_Id } });

    if (!rol) {
        return { message: 'Rol no encontrado' };
    }

    const usuario = this.usuarioRepository.create({
        usuario_nombre: usuarioDto.usuario_nombre,
        usuario_apellido: usuarioDto.usuario_apellido,
        usuario_email: usuarioDto.usuario_email,
        usuario_password: usuarioDto.usuario_password, // HAy que escritar la contraseña
        rol: rol,
    });

    await this.usuarioRepository.save(usuario);

    // Aquí deberías agregar la lógica para crear el usuario usando usuarioDto y rol

    return { message: 'Usuario creado exitosamente' };

}

  //OBTENER TODOS LOS USUARIOS
  async getAllUsuarios(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.createQueryBuilder('usuario')
      .leftJoin('usuario.rol', 'rol') // Asegúrate de que 'rol' es el nombre correcto de la relación
      .leftJoin('rol.usuario', 'usuario') // Asegúrate de que 'usuario' es el nombre correcto de la relación inversa
        .getMany();
}

}
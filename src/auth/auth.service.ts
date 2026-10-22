import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/entity/rol.entity';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';



@Injectable()
export class AuthService {

    constructor(
        //servicio para generar y verificar tokens JWT
        private readonly jwtService: JwtService,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,

        @InjectRepository(RolEntity) 
        private readonly rolRepository: Repository<RolEntity>,
    ){}

    async registerusuario(usuarioData: CreateUsuarioDto){
    //generamos salt para mejorar la seguridad del hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    // hashear la contraseña del usuario con el salt generado
    const hashedPassword = await bcrypt.hash(usuarioData.usuario_password, salt);
    //buscar el rol por su ID
    const rol = await this.rolRepository.findOne({where: {rol_id: usuarioData.rol_Id}});

    //validar si el rol existe, enviamos una excepcion con un mensaje de error
    if(!rol){
        throw new BadRequestException('El Rol no existe');

    }

    const newUsuario = this.usuarioRepository.create({
        ...usuarioData,
        usuario_password: hashedPassword,
        rol //asignar el rol encontrado al usuario
    });

    await this.usuarioRepository.save(newUsuario);
     return { message: 'Usuario registrado exitosamente' };
  }

  // ------------------ LOGIN ------------------
  async login(email: string, password: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { usuario_email: email },
      relations: ['rol'], // 🔑 para traer el rol asociado
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      usuario.usuario_password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear payload del token
    const payload = {
      sub: usuario.usuario_id,
      username: usuario.usuario_nombre,
      role: usuario.rol.rol_nombre, // 🔑 así luego puedes usar payload.role en JwtStrategy
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


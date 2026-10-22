import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService,
    ) { }

    @Post()
    async createUsuario(@Body() dto: CreateUsuarioDto) {
      return await this.usuarioService.createusuario(dto);
    }

    @Get()
    async getAllUsuarios() {
      return await this.usuarioService.getAllUsuarios();
    }
}

import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}

    @Post('register')
    async register(@Body() usuarioData: CreateUsuarioDto){
        return this.authservice.registerusuario(usuarioData);
    }

    
  // ------------------ LOGIN ------------------
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authservice.login(body.email, body.password);
}

}
    
    import {Injectable } from '@nestjs/common';
    import { PassportStrategy } from '@nestjs/passport';
    import { ExtractJwt, Strategy } from 'passport-jwt';
    import { ConfigService } from '@nestjs/config'; 
    import { PayloadTooLargeException } from '@nestjs/common';
    
    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy) {

        constructor(private configService: ConfigService){
            super({
                //configurar para extraer 
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false, //configurar para rechazar token expirados
            //Recueprar la clave secreta desde las variables de entorno
                secretOrKey: configService.get<string>('JWT-SECRET'),       
            });

        }

           async validate(payload: any) {
            return {
            userId: payload.sub,
            username: payload.username,
            role: payload.role, // este rol sirve para autorizar en los guards y toma el role del payload que se creo en auth.service.ts;
        }
    }

    }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'backend-user',   // cambia si usas otro usuario
      password: 'admin',
      database: 'backend-user',
      entities: [__dirname + "/**/*.entity{.ts,.js}"],     // carga entidades automáticamente
      synchronize: true,          // crea/actualiza tablas (sólo dev)
      logging: true,             // muestra logs de las consultas
    }),
    RolModule,
    UsuarioModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

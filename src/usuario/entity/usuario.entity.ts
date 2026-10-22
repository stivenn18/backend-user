import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolEntity } from 'src/rol/entity/rol.entity';

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  usuario_id: number;

  @Column({ name: 'usuario_nombre', type: 'varchar', length: 50, unique: true, nullable: false })
  usuario_nombre: string;

  @Column({ name: 'usuario_apellido', type: 'varchar', length: 50, unique: true, nullable: false})
  usuario_apellido: string;

 @Column({ name: 'usuario_email', type: 'varchar', length: 100,unique: true, nullable: false })
  usuario_email: string;

  @Column({ name: 'usuario_password', type: 'varchar', length: 100, unique: true, nullable: false })
  usuario_password: string;

@ManyToOne(() => RolEntity, (rol) => rol.usuarios, )
rol : RolEntity;
    
 }

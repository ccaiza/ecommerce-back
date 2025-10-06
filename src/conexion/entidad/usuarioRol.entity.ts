import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { User } from "./user.entity";
import { Rol } from "./rol.entity";

/**
 * Entidad que representa a la tabla usuario_rol en la base de datos.
 * @author ccaiza
 */
@Entity({ name: 'usuario_rol' })
export class UsuarioRol {

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, { eager: false })
    @JoinColumn({ name: 'usuario_id' })
    usuarioId: User;

    @ManyToOne(() => Rol, { eager: false })
    @JoinColumn({ name: 'rol_id' })
    rolId: Rol;

    @Column({ type: 'boolean', nullable: false, default: () => false })
    estado: boolean;
    // @Column({ name: 'usuario_id', nullable: false })
    // usuarioId: number;
    // @Column({ name: 'rol_id', nullable: false })
    // rolId: number;
    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @VersionColumn()
    version: number;
}
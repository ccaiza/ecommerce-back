import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";

/**
 * Entidad que representa a la tabla rol en la base de datos..
 * @author ccaiza
 */
@Entity({ name: 'rol' })
export class Rol {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    nombre: string;

    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @VersionColumn()
    version: number;

    @Column({ type: 'boolean', nullable: false, default: () => false })
    estado: boolean;
    
}
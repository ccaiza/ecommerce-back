import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, VersionColumn } from "typeorm";

/**
 * Entidad que representa a la tabla rol en la base de datos..
 * @author ccaiza
 */
@Entity({ name: 'rol' })
export class Rol {

    @PrimaryColumn({ type: 'varchar', length: 15 })
    id: string;

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
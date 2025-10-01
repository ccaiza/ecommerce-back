import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { hash } from 'bcrypt';

/**
 * Etidad usuario
 */
@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text",{ nullable: true })
    imagen: string;

    @Column({ nullable: false })
    nombre: string;

    @Column({ nullable: false })
    apellido: string;

    @Column({ unique: true, nullable: false })
    email: string;
    @Column({ nullable: false })
    telefono: string;
    @Column({ nullable: false })
    password: string;
    @Column({ nullable: true })
    notificacionToken: string;

    @Column({ type: 'datetime', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @VersionColumn()
    version: number;

    @BeforeInsert()
    private async initPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT))
    }
}

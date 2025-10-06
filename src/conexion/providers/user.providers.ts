import { User } from "src/conexion/entidad/user.entity";
import { DataSource } from "typeorm";
import { Rol } from "../entidad/rol.entity";
import { UsuarioRol } from "../entidad/usuarioRol.entity";

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];

export const rolProviders = [
  {
    provide: 'ROL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rol),
    inject: ['DATA_SOURCE'],
  },
];

export const usuarioRolProviders = [
  {
    provide: 'USUARIO_ROL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UsuarioRol),
    inject: ['DATA_SOURCE'],
  },
];
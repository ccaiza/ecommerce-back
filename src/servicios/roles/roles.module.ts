import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/conexion/database/database.module';
import { Rol } from 'src/conexion/entidad/rol.entity';
import { rolProviders } from 'src/conexion/providers/user.providers';

@Module({
    imports: [
        DatabaseModule,
        // TypeOrmModule.forFeature([Rol])
    ],
    controllers: [RolesController],
    providers: [
        ...rolProviders,
        RolesService,
    ],
})
export class RolesModule { }

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/conexion/database/database.module';
import { UsersService } from './users.service';
import { rolProviders, userProviders, usuarioRolProviders } from 'src/conexion/providers/user.providers';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesService } from '../roles/roles.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [ 
    ...userProviders,
    ...rolProviders,
    ...usuarioRolProviders,
    UsersService,RolesService,JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}

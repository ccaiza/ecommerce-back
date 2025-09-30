import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/conexion/database/database.module';
import { databaseProviders } from 'src/conexion/database/database.providers';
import { UsersService } from './users.service';
import { userProviders } from 'src/conexion/providers/user.providers';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [DatabaseModule],
  providers: [ ...userProviders,UsersService,JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {}

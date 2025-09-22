import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/conexion/database/database.module';
import { userProviders } from 'src/conexion/providers/user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService, ...userProviders],
  controllers: [AuthController]
})
export class AuthModule {}

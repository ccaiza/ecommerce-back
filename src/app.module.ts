import { RolesModule } from './servicios/roles/roles.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './servicios/users/users.module';
import { DatabaseModule } from './conexion/database/database.module';
import { AuthModule } from './servicios/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RolesModule, UsersModule, DatabaseModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que process.env esté disponible en toda la app
    }),

  ],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }

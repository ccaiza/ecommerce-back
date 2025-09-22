import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './servicios/users/users.module';
import { DatabaseModule } from './conexion/database/database.module';
import { AuthModule } from './servicios/auth/auth.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

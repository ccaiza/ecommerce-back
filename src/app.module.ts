import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './servicios/users/users.module';
import { DatabaseModule } from './conexion/database/database.module';
import { AuthModule } from './servicios/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que process.env esté disponible en toda la app
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

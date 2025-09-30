import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/conexion/database/database.module';
import { userProviders } from 'src/conexion/providers/user.providers';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constantes/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),

  ],
  providers: [AuthService, ...userProviders,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

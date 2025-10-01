import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { jwtConstants } from './common/constantes/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(jwtConstants.port ?? 3000, jwtConstants.ip || 'localhost');
  // console.log('JWT_SECRET:', jwtConstants.secret);
}
bootstrap();

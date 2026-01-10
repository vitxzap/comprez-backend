import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'config/env';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger + Scalar set-up
  const config = new DocumentBuilder()
    .setTitle('Comprez documentation')
    .setDescription('Comprez video compressor api documentation')
    .setVersion('0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  app.use(
    '/reference',
    apiReference({
      content: documentFactory
    })
  );

  //Pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(env.PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'config/env';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import helmet from "helmet"
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });
  app.use(helmet())
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  //Pipes
  app.useGlobalPipes(new ValidationPipe());

  //Swagger + Scalar set-up
  const config = new DocumentBuilder()
    .setTitle('Comprez documentation')
    .setDescription('Comprez video compressor api documentation')
    .setVersion('0.1')
    .addCookieAuth('better-auth.session_token')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);

  //using scalar to document the api
  app.use(
    '/api/docs',
    apiReference({
      sources: [
        {
          url: '/api/docs',
          title: 'Comprez',
          slug: 'comprez',
          content: documentFactory,
          default: true
        },
        {
          url: '/api/auth/open-api/generate-schema',
          title: 'Auth',
          slug: 'auth'
        }
      ],
      theme: 'kepler'
    })
  );

  await app.listen(env.PORT);
}
bootstrap();

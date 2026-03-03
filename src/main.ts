import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'config/env';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import helmet from 'helmet';
import { ErrorResponseDto } from './utils/dtos/response.dto';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });
  app.setGlobalPrefix(env.GLOBAL_PREFIX);
  //Swagger + Scalar set-up
  const config = new DocumentBuilder()
    .setTitle('Comprez')
    .setDescription('Comprez API Reference')
    .setVersion('0.1')

    //Bad request
    .addGlobalResponse({
      status: 400,
      type: ErrorResponseDto,
      description:
        'Bad request. Usually due to missing parameters, or invalid parameters.'
    })

    //Internal server error
    .addGlobalResponse({
      status: 500,
      type: ErrorResponseDto,
      description:
        'Internal Server Error. This is a problem with the server that you cannot fix.'
    })

    //Unauthorized
    .addGlobalResponse({
      status: 401,
      type: ErrorResponseDto,
      description:
        'Unauthorized. Due to missing or invalid authentication.'
    })

    //Too Many Requests
    .addGlobalResponse({
      status: 429,
      type: ErrorResponseDto,
      description:
        'Too Many Requests. You have exceeded the rate limit. Try again later.'
    })

    //Compressor controller tag
    .addTag("Compressor", "Endpoints that can help you to compress video files.")
    .addCookieAuth('better-auth.session_token')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);

  //using scalar to document the api
  app.use(
    '/v1/docs',
    apiReference({
      sources: [
        {
          url: '/v1/docs',
          title: 'Comprez',
          slug: 'comprez',
          content: documentFactory,
          default: true
        },
        {
          url: '/v1/auth/open-api/generate-schema',
          title: 'Auth',
          slug: 'auth'
        }
      ],
      theme: 'kepler'
    })
  );

  //Pipes
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });


  await app.listen(env.PORT);
}
bootstrap();
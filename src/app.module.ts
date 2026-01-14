import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'config/env';
import { PrismaModule } from './database/prisma/prisma.module';
import { VideoModule } from './modules/video/video.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './utils/multer.options';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AUTH_CONFIG } from './auth/config/symbols';
import { AuthConfigModule } from './auth/config/auth.config.module';
import { BetterAuthOptions } from 'better-auth';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      envFilePath: '.env'
    }),
    AuthModule.forRootAsync({
      isGlobal: true,
      imports: [AuthConfigModule],
      inject: [AUTH_CONFIG],
      useFactory: (config: BetterAuthOptions) => {
        return {
          auth: config
        };
      }
    }),
    MulterModule.register(multerOptions),
    PrismaModule,
    VideoModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

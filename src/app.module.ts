import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'config/env';
import { PrismaModule } from './database/prisma/prisma.module';
import { VideoModule } from './modules/video/video.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './utils/multer.options';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AuthConfigService } from './auth/auth.config.service';
import { AUTH_CONFIG } from './auth/symbols';
import { AuthConfigModule } from './auth/auth.config.module';
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
      useFactory: async (config) => {
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

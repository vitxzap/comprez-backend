import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'config/env';
import { PrismaModule } from './database/prisma/prisma.module';
import { VideoModule } from './modules/video/video.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './utils/multer.options';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      envFilePath: '.env'
    }),
    MulterModule.register(multerOptions),
    PrismaModule,
    VideoModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

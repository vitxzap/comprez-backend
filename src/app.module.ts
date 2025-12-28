import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'env';
import { PrismaModule } from './database/prisma/prisma.module';
import { VideoModule } from './modules/video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      envFilePath: ".env "
    }),
    PrismaModule,
    VideoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

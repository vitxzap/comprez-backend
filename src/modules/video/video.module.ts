import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoContract } from './video.contract';
import { VideoRepository } from './video.repository';
import { VideoController } from './video.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterOptionsService } from 'src/modules/video/video.multer.options.service';

@Module({
  providers: [
    VideoService,
    {
      provide: VideoContract,
      useClass: VideoRepository
    }
  ],
  imports: [
    MulterModule.registerAsync({
      useClass: MulterOptionsService
    })
  ],
  controllers: [VideoController]
})
export class VideoModule {}

import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoContract } from './video.contract';
import { VideoRepository } from './video.repository';
import { VideoController } from './video.controller';
import { MulterModule } from '@nestjs/platform-express';
import { VideoMulterOptionsService } from 'src/modules/video/video.multer.options.service';

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
      useClass: VideoMulterOptionsService
    })
  ],
  controllers: [VideoController]
})
export class VideoModule {}

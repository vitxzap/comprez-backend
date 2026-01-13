import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoContract } from './video.contract';
import { VideoRepository } from './video.repository';
import { VideoController } from './video.controller';

@Module({
  providers: [
    VideoService,
    {
      provide: VideoContract,
      useClass: VideoRepository
    }
  ],
  controllers: [VideoController]
})
export class VideoModule {}

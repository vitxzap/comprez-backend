import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoContract } from './video.contract';
import { VideoRepository } from './video.repository';

@Module({
  providers: [
    VideoService,
    {
      provide: VideoContract,
      useClass: VideoRepository,
    },
  ],
})
export class VideoModule {}

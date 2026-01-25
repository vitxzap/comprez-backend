import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoContract } from './video.contract';
import { VideoRepository } from './video.repository';
import { VideoController } from './video.controller';
import { MulterModule } from '@nestjs/platform-express';
import { VideoMulterOptionsService } from 'src/modules/video/video.multer.options.service';
import { BullModule } from '@nestjs/bullmq';
import { BullConfigService } from 'src/config/queue/bull.config.service';

@Module({
  providers: [
    VideoService,
    {
      provide: VideoContract,
      useClass: VideoRepository
    }
  ],
  imports: [
    BullModule.registerQueue({
      name: 'video'
    }),
    MulterModule.registerAsync({
      useClass: VideoMulterOptionsService
    })
  ],
  controllers: [VideoController]
})
export class VideoModule {}

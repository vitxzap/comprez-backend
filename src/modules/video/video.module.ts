import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoContract } from './video.contract';
import { VideoRepository } from './video.repository';
import { VideoController } from './video.controller';
import { MulterModule } from '@nestjs/platform-express';
import { VideoMulterOptionsService } from 'src/config/multer/video.multer.config.service';
import { BullModule } from '@nestjs/bullmq';
import { VideoProcessor } from './video.processor';

@Module({
  providers: [
    VideoService,
    VideoProcessor,
    {
      provide: VideoContract,
      useClass: VideoRepository
    }
  ],
  imports: [
    BullModule.registerQueue({
      name: 'video',
      defaultJobOptions: {
        removeOnComplete: true
      }
    }),
    MulterModule.registerAsync({
      useClass: VideoMulterOptionsService
    })
  ],
  controllers: [VideoController]
})
export class VideoModule {}

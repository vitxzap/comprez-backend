import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoContract } from './video.contract';
import { VideoRepository } from './video.repository';
import { VideoController } from './video.controller';
import { MulterModule } from '@nestjs/platform-express';
import { VideoMulterOptionsService } from 'src/config/multer/video.multer.config.service';
import { BullModule } from '@nestjs/bullmq';
import { VideoEventListener } from './queue/video.event.listener';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  providers: [
    VideoService,
    VideoEventListener,
    {
      provide: VideoContract,
      useClass: VideoRepository
    }
  ],
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'video',
      processors: [{
        name: "compress",
        path: pathToFileURL(__dirname + "/queue/video.processor.js"),
        concurrency: 2
      }],
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
export class VideoModule { }

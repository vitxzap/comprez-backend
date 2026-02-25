import { Module } from '@nestjs/common';
import { CompressorService } from './compressor.service';
import { CompressorContract } from './compressor.contract';
import { CompressorRepository } from './compressor.repository';
import { CompressorController } from './compressor.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CompressorMulterOptions } from 'src/config/multer/compressor.config.service';
import { BullModule } from '@nestjs/bullmq';
import { CompressorEventListener } from './events/compressor.event.listener';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { queues } from 'queues/config/names';
import { FeatureFlagModule } from '../flagsmith/flagsmith.module';
import { S3Module } from '../aws/s3/aws.s3.module';

@Module({
  providers: [
    CompressorService,
    CompressorEventListener,
    {
      provide: CompressorContract,
      useClass: CompressorRepository
    }
  ],
  imports: [
    PrismaModule,
    FeatureFlagModule,
    S3Module,
    BullModule.registerQueue({
      name: queues.compressor,
      defaultJobOptions: {
        removeOnComplete: true
      }
    }),
    MulterModule.registerAsync({
      useClass: CompressorMulterOptions
    })
  ],
  controllers: [CompressorController]
})
export class CompressorModule { }

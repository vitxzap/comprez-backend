import { Module } from '@nestjs/common';
import { CompressorService } from './compressor.service';
import { CompressorContract } from './compressor.contract';
import { CompressorRepository } from './compressor.repository';
import { CompressorController } from './compressor.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CompressorMulterOptions } from 'src/config/multer/compressor.config.service';
import { BullModule } from '@nestjs/bullmq';
import { CompressorEventListener } from './queue/compressor.event.listener';
import { pathToFileURL } from 'url';
import { PrismaModule } from 'src/database/prisma/prisma.module';

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
    BullModule.registerQueue({
      name: 'compressor',
      processors: [{
        name: "compress",
        path: pathToFileURL(__dirname + "/queue/compressor.processor.js"),
        concurrency: 2
      }],
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

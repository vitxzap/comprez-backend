import { Injectable } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JobData, JobNames, QueueParams } from './types/queue.types';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Video } from 'generated/prisma/client';

@Injectable()
export class CompressorRepository implements CompressorContract {
  constructor(
    @InjectQueue('compressor')
    private compressorQueue: Queue<JobData, any, JobNames>,
    private readonly prismaService: PrismaService
  ) { }


  // Send the file to the compression queue, so the worker can process it
  async compressFile(params: QueueParams): Promise<string | undefined> {
    const job = await this.compressorQueue.add(
      'compress',
      {
        userId: params.userId,
        ext: params.ext,
        originalName: params.originalName,
        originalSize: params.originalSize
      },
      {
        jobId: params.jobId
      }
    );
    return job.id;
  }


  //Save the compression metadata to the database.
  async saveCompressionData(file: Video): Promise<void> {
    this.prismaService.video.create({
      data: {
        originalname: file.originalname,
        userId: file.userId,
        destination: file.destination,
        ext: file.ext,
        preset: file.preset,
        originalSize: file.originalSize,
        compressedSize: file.compressedSize,
      }
    })
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JobData, JobNames, JobReturnValues, QueueParams } from './types/queue.types';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SqsService } from '@ssut/nestjs-sqs';
import { FEATURE_FLAG } from '../flagsmith/flagsmith.provider';
import { Flagsmith } from 'flagsmith-nodejs';
import { FeatureFlagService } from '../flagsmith/flagsmith.service';
import { Flags } from '../flagsmith/types';


@Injectable()
export class CompressorRepository implements CompressorContract {
  constructor(
    @InjectQueue('compressor')
    private compressorQueue: Queue<JobData, any, JobNames>,
    private readonly prismaService: PrismaService,
    private sqsService: SqsService,
    private featureFlag: FeatureFlagService
  ) { }
  private logger = new Logger(CompressorRepository.name)

  // Send the file to the compression queue, so the worker can process it
  async compressFile(params: QueueParams): Promise<string | undefined> {
    if (await this.featureFlag.isFlagEnabled(Flags.USE_SQS_QUEUE)) {
      this.logger.debug("Using SQS Queue")
      const message = await this.sqsService.send("compressor-producer", {
        body: params.originalName,
        id: params.userId
      })
      return message[0].MessageId
    }
    else {
      this.logger.debug("Using BULLMQ queue")
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
  }


  //Save the compression metadata to the database.
  async saveCompressionData(file: JobReturnValues["data"]): Promise<void> {
    await this.prismaService.compression.create({
      data: {
        originalName: file.originalName,
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

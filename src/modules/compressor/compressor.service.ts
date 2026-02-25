import { Injectable, Logger } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { type JobReturnValues, QueueParams } from './types/queue.types';
import { OnEvent } from '@nestjs/event-emitter';
import { CreatePresignedUrlDto } from "src/modules/aws/s3/dtos/aws.s3.dto"
@Injectable()
export class CompressorService {
  private logger = new Logger(CompressorService.name);
  constructor(private readonly compressorContract: CompressorContract) { }
  async compressFile(file: QueueParams): Promise<string | undefined> {
    const jobId = this.compressorContract.compressFile(file);
    return jobId;
  }

  @OnEvent("job.*.completed")
  async saveCompressionData(payload: JobReturnValues) {
    await this.compressorContract.saveCompressionData(payload.data)
    this.logger.log("Compression data saved into database! userId: " + payload.data.userId)
  }

  async createPresignedUrl (params: CreatePresignedUrlDto) {
    const url = await this.compressorContract.createPresignedUrl(params)
    return url
  }
}

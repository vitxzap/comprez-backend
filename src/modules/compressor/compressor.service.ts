import { Injectable } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { QueueParams } from './types/queue.types';
@Injectable()
export class CompressorService {
  constructor(private readonly compressorContract: CompressorContract) { }
  async compressFile(file: QueueParams): Promise<string | undefined> {
    const jobId = this.compressorContract.compressFile(file);
    return jobId;
  }
}

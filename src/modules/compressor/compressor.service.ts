import { Injectable, Logger } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { RequestS3UploadDto } from "src/aws/s3/dtos/aws.s3.dto"
@Injectable()
export class CompressorService {
  constructor(private readonly compressorContract: CompressorContract) { }

  async requestS3Upload(params: RequestS3UploadDto, userId: string) {
    const url = await this.compressorContract.requestS3Upload(params, userId)
    return url
  }

  async requestS3Download() {
    throw new Error('Method not implemented.');
  }
}

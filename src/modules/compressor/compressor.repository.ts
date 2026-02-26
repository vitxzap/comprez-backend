import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { FeatureFlagService } from '../flagsmith/flagsmith.service';
import { Flags } from '../flagsmith/types';
import { RequestS3UploadDto } from "src/aws/s3/dtos/aws.s3.dto"
import { S3Service } from 'src/aws/s3/aws.s3.service';


@Injectable()
export class CompressorRepository implements CompressorContract {
  constructor(
    private featureFlag: FeatureFlagService,
    private s3Service: S3Service
  ) { }
  private logger = new Logger(CompressorRepository.name)

  //Creates a presigned url to upload files to the s3 bucket
  async requestS3Upload(params: RequestS3UploadDto, userId: string): Promise<string | undefined> {
    if (await this.featureFlag.isFlagEnabled(Flags.ENABLE_S3_FEATURES)) {
      const url = await this.s3Service.requestS3Upload(params, userId)
      this.logger.warn("S3 upload url generated")
      return url
    }
    else {
      this.logger.error("Tried to use S3 features while flag is disabled")
      throw new ForbiddenException("this feature is currently disabled")
    }
  }

  //Creates a presigned ulr to download a single file from the s3 bucket
  async requestS3Download(params: RequestS3UploadDto) {
    throw new Error("Method not implemented");
  }
}

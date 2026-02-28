import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { RequestS3UploadDto } from "./dtos/compressor.dto"
import { FeatureFlagService } from '../flagsmith/flagsmith.service';
import { Flags } from '../flagsmith/types';
import { S3Service } from 'src/aws/s3/aws.s3.service';
@Injectable()
export class CompressorService {
  constructor(private readonly compressorContract: CompressorContract,
    private readonly featureFlag: FeatureFlagService,
    private readonly s3Service: S3Service,
  ) { }
  private logger = new Logger(CompressorService.name)
  async requestS3Upload(params: RequestS3UploadDto, userId: string) {
    if (await this.featureFlag.isFlagEnabled(Flags.ENABLE_S3_FEATURES)) {
      //Generates the key (path) for the s3
      const key = this.s3Service.generateS3Key(userId, params.filename)

      const url = await this.s3Service.requestS3Upload(key, params.mimetype)
      this.logger.debug("S3 upload url generated")
      await this.compressorContract.storeCompression(key, userId)
      this.logger.debug("Compression data stored into database")
      return url
    }
    else {

      this.logger.error("Tried to use S3 features while flag is disabled")
      throw new ForbiddenException("this feature is currently disabled")

    }
  }

  async requestS3Download(userId: string, compressionId: string) {
    if (await this.featureFlag.isFlagEnabled(Flags.ENABLE_S3_FEATURES)) {
      const key = await this.compressorContract.getDestinationById(userId, compressionId)


      const url = await this.s3Service.requestS3Download(key)
      this.logger.debug("S3 download url generated")
      return url

    }
    else {

      this.logger.error("Tried to use S3 features while flag is disabled")
      throw new ForbiddenException("this feature is currently disabled")

    }
  }
}

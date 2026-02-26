import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { RequestS3UploadDto } from "./dtos/compressor.dto"
import { Flagsmith } from 'flagsmith-nodejs';
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

      const url = await this.s3Service.requestS3Upload(params.filename, params.mimetype, userId)
      this.logger.debug("S3 upload url generated")

      await this.compressorContract.storeCompression(url, userId)
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

      if (key) {
        const url = await this.s3Service.requestS3Download(key)
        this.logger.debug("S3 download url generated")
        return url
      }

      throw new NotFoundException("Data not found")
    }
    else {

      this.logger.error("Tried to use S3 features while flag is disabled")
      throw new ForbiddenException("this feature is currently disabled")

    }
  }
}

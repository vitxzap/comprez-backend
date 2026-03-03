import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CompressorContract } from './compressor.contract';
import { RequestS3UploadDto, S3UploadResponseDto, S3UrlResponseDto } from "./dtos/compressor.dto"
import { FeatureFlagService } from '../featureFlag/feature-flag.service';
import { FEATURE_FLAGS } from '../featureFlag/types/feature-flag.types';
import { S3Service } from 'src/aws/s3/aws.s3.service';
import { UserCompressions } from './types/compressor.types';
@Injectable()
export class CompressorService {
  constructor(private readonly compressorContract: CompressorContract,
    private readonly featureFlag: FeatureFlagService,
    private readonly s3Service: S3Service,
  ) { }
  private logger = new Logger(CompressorService.name)
  async requestS3Upload(params: RequestS3UploadDto, userId: string): Promise<S3UploadResponseDto> {
    if (await this.featureFlag.isCachedFlagEnabled(FEATURE_FLAGS.ENABLE_S3_FEATURES)) {
      const compressionId = await this.compressorContract.storeCompression({
        filename: params.filename,
        mimetype: params.mimetype,
        userId: userId
      });
      this.logger.debug("Compression registry stored into database");

      //Generates the key (path) for the s3
      const key = this.s3Service.generateS3Key({
        compressionId: compressionId,
        filename: params.filename,
        userId: userId
      });
      const url = await this.s3Service.requestS3Upload(key, params.mimetype);
      this.logger.debug(`S3 upload url generated: ${key}`);

      return {
        url: url,
        id: compressionId,
      };

    }
    else {

      this.logger.error("Tried to use S3 features while flag is disabled");
      throw new ForbiddenException("this feature is currently disabled");

    }
  }

  async requestS3Download(userId: string, compressionId: string): Promise<S3UrlResponseDto> {
    if (await this.featureFlag.isCachedFlagEnabled(FEATURE_FLAGS.ENABLE_S3_FEATURES)) {
      //Generates the key (path) for the s3
      const key = await this.compressorContract.getS3KeyById(userId, compressionId);
      const url = await this.s3Service.requestS3Download(key);
      this.logger.debug("S3 download url generated");
      return {
        url: url
      };
    }
    else {

      this.logger.error("Tried to use S3 features while flag is disabled");
      throw new ForbiddenException("this feature is currently disabled");

    }
  }

  async getUserCompressions(userId: string): Promise<UserCompressions[]> {
    const compressions = await this.compressorContract.getUserCompressionsById(userId)
    return compressions
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompressorService } from './compressor.service';
import {
  Session,
  type UserSession
} from '@thallesp/nestjs-better-auth';
import {
  ApiCookieAuth,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CompressionsResponseDto, RequestS3UploadDto, S3UploadResponseDto, S3UrlResponseDto } from "./dtos/compressor.dto"
import { MimetypeGuard } from 'src/guards/mimetype.guard';
import { FlagMetadata } from 'src/modules/featureFlag/flags.decorator';
import { FEATURE_FLAGS } from '../featureFlag/types/types';
import { FeatureFlagService } from '../featureFlag/feature-flag.service';

@ApiCookieAuth()
@Controller('compressor')
@ApiTags("Compressor")
export class CompressorController {
  constructor(
    private featureFlag: FeatureFlagService,
    private readonly compressorService: CompressorService,
  ) { }

  //TODO: 
  // Endpoint to upload files through pre-signed URL (S3) -- done (25/02)
  // Endpoint to download files though pre-signed URL (S3) -- done(26/02)
  // Return the compression id so the user/front can access it -- 
  @ApiOperation({
    description: "Requests a presigned url to upload the file."
  })
  @ApiOkResponse({
    description: "URL Created.",
    type: S3UploadResponseDto
  })
  //Defines which array of valid mimetypes will use 
  @FlagMetadata(FEATURE_FLAGS.COMPRESSOR_ALLOWED_FILE_TYPES)
  @UseGuards(MimetypeGuard)
  @Get("request-upload")
  async requestUpload(@Body() RequestS3UploadDto: RequestS3UploadDto, @Session() session: UserSession): Promise<S3UploadResponseDto> {
    const { url, id } = await this.compressorService.requestS3Upload(RequestS3UploadDto, session.user.id)
    return {
      url: url,
      id: id
    }
  }

  @ApiOperation({
    description: "Requests a presigned url to download the specified file.",
  })
  @ApiOkResponse({
    type: S3UrlResponseDto,
    description: "Url created."
  })
  @Get("request-download/:compressionId")
  async requestDownload(@Param("compressionId") compressionId: string, @Session() session: UserSession): Promise<S3UrlResponseDto> {
    const { url } = await this.compressorService.requestS3Download(session.user.id, compressionId)
    return {
      url: url
    }
  }

  @Get("cachedFlags")
  async getFlags() {
    return await this.featureFlag.getCachedFlags()
  }

  @ApiOperation({
    description: "Get all compressions from your user."
  })
  @ApiOkResponse({
    type: CompressionsResponseDto,
    description: "Compressions returned."
  })
  @Get("compressions")
  async getUserCompressions(@Session() session: UserSession) {
    const compressions = await this.compressorService.getUserCompressions(session.user.id)
    return compressions
  }
}


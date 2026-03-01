import {
  Body,
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { CompressorService } from './compressor.service';
import {
  Session,
  type UserSession
} from '@thallesp/nestjs-better-auth';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CompressorUrlResponseDto, RequestS3UploadDto } from "./dtos/compressor.dto"
import { ErrorResponseDto } from 'src/utils/dtos/response.dto';
@ApiCookieAuth()
@Controller('compressor')
export class CompressorController {
  constructor(
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
    description: "Ok. URL Created.",
    type: CompressorUrlResponseDto
  })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description:
      'Bad request. Usually due to missing parameters, or invalid parameters.'
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
    description:
      'Internal Server Error. This is a problem with the server that you cannot fix.'
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponseDto,
    description: 'Unauthorized. Due to missing or invalid authentication.'
  })
  @Get("request-upload")
  async requestUpload(@Body() RequestS3UploadDto: RequestS3UploadDto, @Session() session: UserSession): Promise<CompressorUrlResponseDto> {
    const { url, compressionId } = await this.compressorService.requestS3Upload(RequestS3UploadDto, session.user.id)
    return {
      url: url,
      compressionId: compressionId
    }
  }

  @ApiOperation({
    description: "Requests a presigned url to download the specified file",
  })
  @ApiOkResponse({
    type: CompressorUrlResponseDto,
    description: "Ok. Url created."
  })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description:
      'Bad request. Usually due to missing parameters, or invalid parameters.'
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
    description:
      'Internal Server Error. This is a problem with the server that you cannot fix.'
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponseDto,
    description: 'Unauthorized. Due to missing or invalid authentication.'
  })
  @Get("request-download/:compressionId")
  async requestDownload(@Param("compressionId") compressionId: string, @Session() session: UserSession): Promise<CompressorUrlResponseDto> {
    const url = await this.compressorService.requestS3Download(session.user.id, compressionId)
    return {
      url: url
    }
  }
}


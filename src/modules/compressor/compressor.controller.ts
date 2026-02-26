import {
  Body,
  Controller,
  Get,
} from '@nestjs/common';
import { CompressorService } from './compressor.service';
import {
  Session,
  type UserSession
} from '@thallesp/nestjs-better-auth';
import {
  ApiCookieAuth,
} from '@nestjs/swagger';
import { RequestS3UploadDto } from "src/aws/s3/dtos/aws.s3.dto"
@ApiCookieAuth()
@Controller('compressor')
export class CompressorController {
  constructor(
    private readonly compressorService: CompressorService,
  ) { }

  //TODO: 
  // Endpoint to upload files through pre-signed URL (S3) -- done (25/02)
  // Endpoint to download files though pre-signed URL (S3) 

  @Get("request-upload")
  async createPresignedUrl(@Body() RequestS3UploadDto: RequestS3UploadDto, @Session() session: UserSession) {
    const url = await this.compressorService.requestS3Upload(RequestS3UploadDto, session.user.id)
    return {
      url: url
    }
  }

}


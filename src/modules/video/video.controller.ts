import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OptionalAuth } from '@thallesp/nestjs-better-auth';
import { FileValidationPipe } from 'src/pipes/file.validation.pipe';
import { validateVideoSchema, VideoDto } from 'src/models/video.model';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/models/response.model';

@OptionalAuth()
@ApiCookieAuth()
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('compress')
  @ApiOkResponse({
    example: { message: 'compressed!' },
    description: 'OK. Video compressed successfully!'
  })
  @ApiUnprocessableEntityResponse({
    type: ErrorResponseDto,
    description: 'Unprocessable Entity. File validation error.'
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Provide your file via multipart/form-data.',
    type: VideoDto
  })
  @UseInterceptors(FileInterceptor('video'))
  async compress(
    @UploadedFile(new FileValidationPipe(validateVideoSchema))
    videoDto: VideoDto
  ) {
    await this.videoService.compress(videoDto.file);
    return {
      message: 'compressed!'
    };
  }
}

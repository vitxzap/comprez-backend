import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OptionalAuth } from '@thallesp/nestjs-better-auth';
import { FileValidationPipe } from 'src/pipes/file.validation.pipe';
import {
  validateVideoSchema,
  VideoDto
} from 'src/modules/video/dtos/video.dto';
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
import { ErrorResponseDto } from 'src/common/dtos/response.dto';


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
    file: VideoDto['file'],
    //extracts the unique id created by multer
    @Body() body: { id: string }
  ) {
    const jobId = await this.videoService.compressFile({
      path: file.path,
      size: file.size,
      id: body.id
    });
    return {
      jobId: jobId
    };
  }
}

import {
  Body,
  Controller,
  Logger,
  MessageEvent,
  Param,
  Post,
  Sse,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  OptionalAuth,
  Session,
  type UserSession
} from '@thallesp/nestjs-better-auth';
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
import { fromEvent, map, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
@OptionalAuth()
@ApiCookieAuth()
@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private eventEmiiter: EventEmitter2
  ) { }

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
  @Post('compress')
  @UseInterceptors(FileInterceptor('video'))
  async compress(
    @UploadedFile(new FileValidationPipe(validateVideoSchema))
    file: VideoDto['file'],
    //extracts the unique id created by multer
    @Body() body: { id: string },
    @Session() session: UserSession
  ) {
    // This is not safe. just for testing purposes
    let id: string = '';
    if (!session) {
      id = uuidv4();
    }

    const jobId = await this.videoService.compressFile({
      path: file.path,
      size: file.size,
      jobId: body.id,
      userId: id
    });
    return {
      jobId: jobId
    };
  }

  @Sse('status/:id')
  async getJobStatus(
    @Param('id') jobId: string
  ): Promise<Observable<MessageEvent>> {
    const added = fromEvent(this.eventEmiiter, `job.${jobId}.added`).pipe(
      map((data: any) => ({ data }))
    );
    added.subscribe({
      next({ data }) {
        Logger.log(
          `Sse event sent: ${JSON.stringify(data)}`,
          VideoController.name
        );
      }
    });
    return added;
  }
}

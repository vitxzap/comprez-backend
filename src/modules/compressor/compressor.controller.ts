import {
  Body,
  Controller,
  MessageEvent,
  Param,
  Post,
  Sse,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { CompressorService } from './compressor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AllowAnonymous,
  Session,
  type UserSession
} from '@thallesp/nestjs-better-auth';
import { FileValidationPipe } from 'src/pipes/file.validation.pipe';
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
import { CompressResponseDto, ErrorResponseDto } from 'src/dto/response.dto';
import { fromEvent, map, merge, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { extname } from 'path';
import { CompressDto } from 'src/dto/compressor.dto';
import { validateCompressorFile } from 'src/pipes/types';
import { UploadInterceptor } from 'src/interceptors/upload/upload.interceptor';
@ApiCookieAuth()
@Controller('compressor')
export class CompressorController {
  constructor(
    private readonly compressorService: CompressorService,
    private eventEmiiter: EventEmitter2
  ) { }

  //TODO: 
  // Endpoint to upload files through pre-signed URL (S3)
  // Endpoint to download files though pre-signed URL (S3) 

  @ApiOkResponse({
    type: CompressResponseDto,
    description: 'OK. Video sent to the compression queue.'
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
    type: CompressDto
  })
  @Post('compress')
  @UseInterceptors(UploadInterceptor, FileInterceptor('video'))
  async compress(
    @UploadedFile(new FileValidationPipe(validateCompressorFile))
    file: CompressDto['file'],
    //extracts the unique folderId created by multer
    @Body() body: CompressDto["body"],
    @Session() session: UserSession
  ) {

    const jobId = await this.compressorService.compressFile({
      originalSize: file.size,
      jobId: body.uploadId,
      originalName: file.originalname,
      userId: session.user.id,
      ext: extname(file.path)
    });
    return {
      jobId: jobId
    };
  }


  //Transmits server-side events to the client based on the jobId
  @Sse('status/:id')
  @AllowAnonymous()
  async getJobStatus(
    @Param('id') jobId: string
  ): Promise<Observable<MessageEvent>> {
    const addedEvent = fromEvent(this.eventEmiiter, `job.${jobId}.added`).pipe(
      map(
        (data: any) => ({ data })
      )
    );
    const progressEvent = fromEvent(this.eventEmiiter, `job.${jobId}.progress`).pipe(
      map(
        (data: any) => ({ data })
      )
    );
    const completedEvent = fromEvent(this.eventEmiiter, `job.${jobId}.completed`).pipe(
      map(
        (data: any) => ({ data })
      )
    )
    return merge(progressEvent, addedEvent, completedEvent);
  }
}


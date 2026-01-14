import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OptionalAuth } from '@thallesp/nestjs-better-auth';

@OptionalAuth()
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('compress')
  @UseInterceptors(FileInterceptor('video'))
  async compress(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'video/mp4',
          skipMagicNumbersValidation: true //I know this is not safe for now, but nest has a bug that makes this validation fail even the file has the correct magic numbers of the specified fileType
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
    )
    video: Express.Multer.File
  ) {
    console.log(video);
    return await this.videoService.compress(video);
  }
}

import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('stream')
  stream(@Query('id') id: string) {
    const service = this.videoService.stream(id);
    return service;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('video'))
  upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 500 * 1000 * 1000 })
        .addFileTypeValidator({
          fileType: 'video/mp4',
          skipMagicNumbersValidation: true, //I know this is not safe for now, but nest has a bug that makes this validation fail even the file has the correct magic numbers of the specified fileType
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    video: Express.Multer.File,
  ) {
    return this.videoService.upload(video);
  }
}

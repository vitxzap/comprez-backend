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
import { multerOptions } from 'src/utils/multer.options';
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('compress')
  @UseInterceptors(FileInterceptor('video', multerOptions))
  async compress(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 500 * 1000 * 1000 })
        .addFileTypeValidator({
          fileType: 'video/mp4',
          skipMagicNumbersValidation: true //I know this is not safe for now, but nest has a bug that makes this validation fail even the file has the correct magic numbers of the specified fileType
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
    )
    video: Express.Multer.File
  ) {
    return await this.videoService.compress(video);
  }
}

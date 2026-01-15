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
import { validateVideoSchema } from 'src/models/video.model';

@OptionalAuth()
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('compress')
  @UseInterceptors(FileInterceptor('video'))
  async compress(
    @UploadedFile(new FileValidationPipe(validateVideoSchema))
    video: Express.Multer.File
  ) {
    return await this.videoService.compress(video);
  }
}

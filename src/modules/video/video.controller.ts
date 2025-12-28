import { Controller, Get, Query } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('stream')
  stream(@Query('id') id: string): Promise<string | void> | string | void {
    const service = this.videoService.stream(id);
    return service;
  }
}

import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';

@Injectable()
export class VideoService {
  constructor(private readonly videoContract: VideoContract) {}
  async compress(video: Express.Multer.File): Promise<string | void> {
    const filename = await this.videoContract.compress(video);
    return filename;
  }
}

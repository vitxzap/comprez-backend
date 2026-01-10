import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';

@Injectable()
export class VideoService {
  constructor(private readonly videoContract: VideoContract) {}
  upload(video: Express.Multer.File): Promise<string | void> | string | void {
    const filename = this.videoContract.upload(video);
    return filename;
  }
  stream(videoId: string): Promise<string | void> | string {
    throw new Error('Method not implemented.');
  }

  async compress() {
    return await this.videoContract.compress();
  }
}

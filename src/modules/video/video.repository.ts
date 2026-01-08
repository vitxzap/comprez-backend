import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';

@Injectable()
export class VideoRepository implements VideoContract {
  upload(video: Express.Multer.File): Promise<string | void> | string | void {
    console.log(video);
    return video.originalname;
  }
  stream(videoId: string): Promise<string | void> | string {
    return 'stream method';
  }
}

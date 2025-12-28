import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';

@Injectable()
export class VideoRepository implements VideoContract {
  upload(video: File): Promise<string | void> | string {
    return 'upload method';
  }
  stream(videoId: string): Promise<string | void> | string {
      return "stream method"
  }
}

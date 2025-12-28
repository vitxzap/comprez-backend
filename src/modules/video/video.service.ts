import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { VideoRepository } from './video.repository';

@Injectable()
export class VideoService {
  constructor(private readonly videoContract: VideoContract) {}

  upload(video: File): Promise<string | void> | string {
    throw new Error('Method not implemented.');
  }

  stream(videoId: string): Promise<string | void> {
    throw new Error('Method not implemented.');
  }
}

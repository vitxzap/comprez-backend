import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class VideoService {
  constructor(
    @InjectQueue('video') private videoQueue: Queue,
    private readonly videoContract: VideoContract
  ) {}
  async compress(file: Express.Multer.File): Promise<string | void> {
    await this.videoQueue.add('compress', {
      size: file.size
    });
  }
}

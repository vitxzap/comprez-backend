import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { FileToQueue } from 'src/common/interfaces/video.interface';

@Injectable()
export class VideoRepository implements VideoContract {
  constructor(@InjectQueue('video') private videoQueue: Queue) {}
  async addFileToQueue(file: FileToQueue): Promise<string | undefined> {
    const job = await this.videoQueue.add(
      'compress',
      {
        file
      },
      {
        jobId: crypto.randomUUID()
      }
    );
    return job.id;
  }
}

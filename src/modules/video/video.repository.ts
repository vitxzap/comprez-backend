import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  FileJobData,
  FileToQueue
} from 'src/common/interfaces/video.interface';

@Injectable()
export class VideoRepository implements VideoContract {
  constructor(@InjectQueue('video') private videoQueue: Queue<FileJobData>) {}
  async addFileToQueue(file: FileToQueue): Promise<string | undefined> {
    const job = await this.videoQueue.add(
      'compress',
      {
        path: file.path,
        size: file.size
      },
      {
        jobId: file.id
      }
    );
    return job.id;
  }
}

import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { FileJobData, FileJobNames, FileToQueue } from 'src/common/types/index';

@Injectable()
export class VideoRepository implements VideoContract {
  constructor(
    @InjectQueue('video')
    private videoQueue: Queue<FileJobData, any, FileJobNames>
  ) {}
  async compressFile(file: FileToQueue): Promise<string | undefined> {
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

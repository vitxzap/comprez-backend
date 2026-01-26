import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { FileToQueue } from 'src/common/interfaces/video.interface';

@Injectable()
export class VideoService {
  constructor(private readonly videoContract: VideoContract) {}
  async compressFile(file: FileToQueue): Promise<string | undefined> {
    const jobId = this.videoContract.addFileToQueue(file);
    return jobId;
  }
}

import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { FileToQueue } from 'src/common/types/index';

@Injectable()
export class VideoService {
  constructor(private readonly videoContract: VideoContract) {}
  async compressFile(file: FileToQueue): Promise<string | undefined> {
    const jobId = this.videoContract.compressFile(file);
    return jobId;
  }
}

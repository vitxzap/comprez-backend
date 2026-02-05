import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { FileToQueue } from 'src/common/types/index';
import { Video } from 'generated/prisma/client';
@Injectable()
export class VideoService {
  constructor(private readonly videoContract: VideoContract) { }
  async compressFile(file: FileToQueue): Promise<string | undefined> {
    const jobId = this.videoContract.compressFile(file);
    return jobId;
  }
}

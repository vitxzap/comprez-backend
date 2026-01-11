import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { spawn } from 'child_process';
import { stdout } from 'process';
import { once } from 'events';
import { fileCompression } from 'src/utils/video.compression';

@Injectable()
export class VideoRepository implements VideoContract {
  stream(videoId: string): Promise<string | void> | string {
    return 'stream method';
  }

  async compress(video: Express.Multer.File): Promise<string | void> {
    return await fileCompression(video);
  }
}

import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { fileCompression } from 'src/utils/video.compression';

@Injectable()
export class VideoRepository implements VideoContract {
  async compress(video: Express.Multer.File): Promise<string | void> {
    return await fileCompression(video);
  }
}

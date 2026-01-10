import { Injectable } from '@nestjs/common';
import { VideoContract } from './video.contract';
import { spawn } from 'child_process';
import { stdout } from 'process';
import { once } from 'events';

@Injectable()
export class VideoRepository implements VideoContract {
  upload(video: Express.Multer.File): Promise<string | void> | string | void {
    console.log(video);
    return video.originalname;
  }
  stream(videoId: string): Promise<string | void> | string {
    return 'stream method';
  }

  compress(video: Express.Multer.File): string | void {
    let response: string = '';
    const ffmpeg = spawn('ffmpeg', ['-h']);
    ffmpeg.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  }
}

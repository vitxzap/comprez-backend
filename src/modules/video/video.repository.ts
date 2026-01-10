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

  compress(video: Express.Multer.File): Promise<string | void> {
    return new Promise((resolve, reject) => {
      let response: string = '';
      const ffmpeg = spawn('ffmpeg', ['-h']);
      ffmpeg.stdout.on('data', (data) => {
        response += data;
      });

      ffmpeg.on('close', (code) => {
        if (code != 0) {
          reject('erro');
        } else {
          resolve(response);
        }
      });
    });
  }
}

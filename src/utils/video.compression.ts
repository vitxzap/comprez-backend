import { spawn } from 'child_process';
import { CompressionOptions } from 'src/models/video.model';

export function fileCompression(file?: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    let payload: string = '';
    const ffmpeg = spawn('ffmpeg', ['-h', '--']);
    ffmpeg.stdout.on('data', (data) => (payload += data));
    ffmpeg.stderr.on('data', (data) => {
      payload += data;
    });
    ffmpeg.on('close', (code) => {
      if (code !== 0) {
        reject(code);
      } else {
        console.log(`ffmpeg exiting with code ${code}`);
        resolve(payload);
      }
    });
  });
}

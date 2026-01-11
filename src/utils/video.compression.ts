import { spawn } from 'child_process';

export function fileCompression(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    let payload: string = '';
    const absolutePath = process.cwd() + '\\' + file.path;
    console.log(absolutePath);
    const videoExtension = `.${file.mimetype.slice(6)}`;
    console.log(videoExtension);
    const ffmpeg = spawn('ffmpeg', [
      '-i',
      absolutePath,
      '-c:v',
      'libx264',
      '-crf',
      '29',
      '-preset',
      'fast',
      '-c:a',
      'aac',
      '-b:a',
      '86k',
      absolutePath + '_compressed' + videoExtension
    ]);
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

import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory
} from '@nestjs/platform-express';
import multer from 'multer';
import { mkdirSync } from 'fs';
import { extname } from 'path';
import { UploadRequest } from 'src/interceptors/upload/types';
/**
 * This Service define the Multer options exclusively for the video module.
 */
@Injectable()
export class CompressorMulterOptions implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      limits: {
        //500Mb
        fileSize: 500 * 1024 * 1024,
        files: 1
      },
      storage: multer.diskStorage({
        destination: (req: UploadRequest, file, cb) => {
          // generates the path of the folder
          const path = `./tmp/uploads/${req.uploadId}`;
          mkdirSync(path, { recursive: true });
          cb(null, path);
        },
        filename: (req, file, cb) => {
          const filename = 'input' + extname(file.originalname);
          cb(null, filename);
        }
      })
    };
  }
}

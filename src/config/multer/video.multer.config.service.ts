import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory
} from '@nestjs/platform-express';
import multer from 'multer';

/**
 * This Class define the Multer options exclusively for the video module.
 */
@Injectable()
export class VideoMulterOptionsService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      limits: {
        fileSize: 500 * 1024 * 1024
      },
      storage: multer.diskStorage({
        destination: './uncompressed_files',
        filename: function (req, file, cb) {
          cb(null, crypto.randomUUID());
        }
      })
    };
  }
}

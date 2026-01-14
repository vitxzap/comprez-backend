import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory
} from '@nestjs/platform-express';
import multer from 'multer';


/**
 * This Class define the Multer options exclusively for the video module.
 */
@Injectable()
export class MulterOptionsService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './uploads',
      limits: {
        fileSize: 500 * 1024 * 1024
      },
      fileFilter(req, file, callback) {
        
      },
      storage: multer.diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, crypto.randomUUID());
        }
      })
    };
  }
}

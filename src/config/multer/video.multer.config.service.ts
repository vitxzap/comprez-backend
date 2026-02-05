import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory
} from '@nestjs/platform-express';
import multer from 'multer';
import { v7 as uuidv7 } from 'uuid';
import { mkdirSync } from 'fs';
import { extname } from 'path';
/**
 * This Service define the Multer options exclusively for the video module.
 */
@Injectable()
export class VideoMulterOptionsService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      limits: {
        fileSize: 250 * 1024 * 1024,
        files: 1
      },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const id = uuidv7();
          // Pass the unique folder id to the request so the controller can catch it
          req.body = {
            jobId: id
          };

          // generates the path of the folder
          const path = `./tmp/uploads/${id}`;
          mkdirSync(path, { recursive: true });
          cb(null, path);
        },
        filename: function (req, file, cb) {
          cb(null, 'input' + extname(file.originalname));
        }
      })
    };
  }
}

import { MulterModuleOptions } from '@nestjs/platform-express';
import multer from 'multer';

export const multerOptions: MulterModuleOptions = {
  dest: './uploads',
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(
        null,
        file.originalname.slice(0, 16) +
          '-' +
          Date.now() +
          file.originalname.slice(
            file.originalname.length - 4,
            file.originalname.length
          )
      );
    }
  })
};

import { MulterModuleOptions } from '@nestjs/platform-express';
import multer from 'multer';

export const multerOptions: MulterModuleOptions = {
  dest: './uploads',
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(
        null,
        crypto.randomUUID() +
          file.originalname.slice(
            file.originalname.length - 4,
            file.originalname.length
          )
      );
    }
  })
};

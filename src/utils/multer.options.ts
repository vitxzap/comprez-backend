import { MulterModuleOptions } from '@nestjs/platform-express';
import multer from 'multer';

export const multerOptions: MulterModuleOptions = {
  dest: './uploads',
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      const extension = file.mimetype.slice(6, file.mimetype.length);
      cb(null, crypto.randomUUID() + extension);
    }
  })
};

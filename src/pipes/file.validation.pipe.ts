import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  UnprocessableEntityException
} from '@nestjs/common';
import { detectAv } from '@file-type/av';
import { fileTypeFromFile } from 'file-type';
import fs from 'fs/promises';
import z from 'zod';
@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodType) {}
  async transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!file) {
      throw new BadRequestException('File is missing');
    }
    const absolutePath = process.cwd() + '/' + file.path;
    const unvalidatedFile = await fileTypeFromFile(absolutePath, {
      customDetectors: [detectAv]
    });
    const isValid = this.schema.safeParse(unvalidatedFile).success;
    if (!isValid) {
      await fs.unlink(absolutePath);
      throw new UnprocessableEntityException('Incorrect file type');
    }
    return file;
  }
}

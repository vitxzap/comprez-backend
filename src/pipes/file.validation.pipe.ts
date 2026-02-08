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
import { dirname } from 'path';
@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodType) { }
  async transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!file) {
      throw new BadRequestException('File is missing');
    }
    const absolutePath = process.cwd() + `\\` + file.path;
    const fileDirname = dirname(file.path)


    const unvalidatedFile = await fileTypeFromFile(absolutePath, {
      customDetectors: [detectAv]
    });
    console.log(unvalidatedFile);
    const isValid = this.schema.safeParse(unvalidatedFile).success;
    
    //If the file is not in the schema, the file is removed with the directory
    if (!isValid) {

      //Removes the file
      await fs.rm(absolutePath)

      // Removes the directory
      await fs.rmdir(fileDirname)
      
      throw new UnprocessableEntityException('Incorrect file type');
    }
    return file;
  }
}

import { FileValidator, Injectable } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

@Injectable()
export class VideoValidatorPipe extends FileValidator {
  isValid(
    file?: IFile | IFile[] | Record<string, IFile[]> | undefined
  ): boolean | Promise<boolean> {
    if (file) {
      return true;
    }
    return false;
  }
  buildErrorMessage(file: any): string {
    throw new Error('Method not implemented.');
  }
}

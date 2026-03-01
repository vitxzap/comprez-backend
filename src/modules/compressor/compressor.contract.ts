import { RequestS3UploadDto } from './dtos/compressor.dto';
import { UserCompressions } from './types/compressor.types';
export abstract class CompressorContract {
  abstract getS3KeyById(userId: string, compressionId: string): Promise<string>;
  abstract storeCompression(s3Key: string, userId: string): Promise<string>
  abstract getUserCompressionsById(userId: string): Promise<UserCompressions[]>
}

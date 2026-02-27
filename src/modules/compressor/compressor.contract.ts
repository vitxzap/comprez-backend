import { RequestS3UploadDto } from './dtos/compressor.dto';
export abstract class CompressorContract {
  abstract getDestinationById(userId: string, compressionId: string): Promise<string>;
  abstract storeCompression(s3Key: string, userId: string): Promise<void>
}

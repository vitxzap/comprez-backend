import { RequestS3UploadDto } from './dtos/compressor.dto';
import { StoreCompressions, UserCompressions } from './types/compressor.types';
export abstract class CompressorContract {
  abstract getS3KeyById(userId: string, compressionId: string): Promise<string>;
  abstract storeCompression(payload: StoreCompressions): Promise<string>
  abstract getUserCompressionsById(userId: string): Promise<UserCompressions[]>
}

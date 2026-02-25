import { CreatePresignedUrlDto } from 'src/modules/aws/s3/dtos/aws.s3.dto';
import { JobReturnValues, QueueParams } from './types/queue.types';
export abstract class CompressorContract {
  abstract compressFile(params: QueueParams): Promise<string | undefined>;
  abstract saveCompressionData(file: JobReturnValues["data"]): Promise<void>;
  abstract createPresignedUrl(params: CreatePresignedUrlDto): Promise<string | undefined>;
}

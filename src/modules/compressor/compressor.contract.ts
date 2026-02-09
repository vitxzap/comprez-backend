import { JobReturnValues, QueueParams } from './types/queue.types';
export abstract class CompressorContract {
  abstract compressFile(params: QueueParams): Promise<string | undefined>;
  abstract saveCompressionData(file: JobReturnValues["data"]): Promise<void>;
}

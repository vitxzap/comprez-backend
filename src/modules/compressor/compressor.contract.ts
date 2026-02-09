import { Video } from 'generated/prisma/client';
import { QueueParams } from './types/queue.types';
export abstract class CompressorContract {
  abstract compressFile(params: QueueParams): Promise<string | undefined>;
  abstract saveCompressionData(file: Video): Promise<void>;
}

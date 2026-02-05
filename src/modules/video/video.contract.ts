import { Video } from 'generated/prisma/client';
import { FileToQueue } from 'src/common/types/index';
export abstract class VideoContract {
  abstract compressFile(file: FileToQueue): Promise<string | undefined>;
  abstract saveCompressionData(file: Video): Promise<void>;
}

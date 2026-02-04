import { Job } from 'bullmq';
import { FileToQueue } from 'src/common/types/index';
export abstract class VideoContract {
  abstract compressFile(file: FileToQueue): Promise<string | undefined>;
}

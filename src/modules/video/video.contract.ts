import { FileToQueue } from 'src/common/interfaces/video.interface';
export abstract class VideoContract {
  abstract addFileToQueue(file: FileToQueue): Promise<string | undefined>;
}

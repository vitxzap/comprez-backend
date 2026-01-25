export abstract class VideoContract {
  abstract compress(file?: Express.Multer.File): Promise<string | void>;
}

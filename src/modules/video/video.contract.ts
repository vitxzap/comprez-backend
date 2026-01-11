export abstract class VideoContract {
  abstract compress(video?: Express.Multer.File): Promise<string | void>;
}

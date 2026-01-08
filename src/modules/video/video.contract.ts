export abstract class VideoContract {
  abstract upload(video: Express.Multer.File): Promise<string | void> | string | void;
  abstract stream(videoId: string): Promise<string | void> | string;
}

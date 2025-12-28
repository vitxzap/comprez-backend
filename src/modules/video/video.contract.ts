export abstract class VideoContract {
  abstract upload(video: File): Promise<string | void> | string;
  abstract stream(videoId: string): Promise<string | void> | string;
}

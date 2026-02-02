import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';
import { FileJobData } from 'src/common/types';

@Processor('video')
export class VideoProcessor extends WorkerHost {
  constructor(private eventEmitter: EventEmitter2) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    await job.updateProgress(10);
    return { success: true };
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job<FileJobData>) {
    this.eventEmitter.emit(`job.${job.id}.progress`, {
      progress: job.progress,
      path: job.data.path
    });
  }
}

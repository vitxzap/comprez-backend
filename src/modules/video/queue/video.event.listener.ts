import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bullmq';
import { CompletedReturnType, ProgressData } from '../dtos/job.dto';

@QueueEventsListener('video')
export class VideoEventListener extends QueueEventsHost {
  private logger = new Logger(VideoEventListener.name);
  constructor(private eventEmitter: EventEmitter2) {
    super();
  }

  /**
   * Emits an event every time a new job is added to the queue
   */
  @OnQueueEvent('added')
  onAdded(job: { jobId: string; name: string }) {
    this.eventEmitter.emit(`job.${job.jobId}.added`, {
      added: true,
      processor: job.name
    });
    this.logger.log(`JobId: ${job.jobId} added to the queue`)
  }

  @OnQueueEvent('progress')
  onProgress(job: Job<ProgressData>) {
    this.logger.log(job.data.progress)
  }

  @OnQueueEvent('completed')
  onCompleted(job: Job<any, CompletedReturnType>) {
    this.logger.log(JSON.stringify(job))
  }
}

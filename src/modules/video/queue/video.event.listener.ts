import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

//Emits and logs video queue events so they can be used by the SSE and other parts of the application
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
    this.logger.debug(`JobId: ${job.jobId} added to the queue`)
  }

  @OnQueueEvent('progress')
  onProgress(job: { jobId: string, data: { progress: object } }) {
    this.eventEmitter.emit(`job.${job.jobId}.progress`, {
      ...job.data
    })
    this.logger.debug(`JobId: ${job.jobId} was update with progress: ${job.data.progress}`)
  }

  @OnQueueEvent('completed')
  onCompleted(job: { jobId: string, returnvalue: object, prev: string }) {
    this.eventEmitter.emit(`job.${job.jobId}.completed`, {
      ...job.returnvalue
    })
    this.logger.debug(`JobId: ${job.jobId} completed successfully!`)
  }
}

import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { CompletedEventData, ProgressEventData } from '../types/events.types';

//Emits and logs compressor queue events so they can be used by the SSE and other parts of the application
@QueueEventsListener('compressor')
export class CompressorEventListener extends QueueEventsHost {
  private logger = new Logger(CompressorEventListener.name);
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
  onProgress(job: ProgressEventData) {
    this.eventEmitter.emit(`job.${job.jobId}.progress`, {
      ...job.data
    })
    this.logger.debug(`JobId: ${job.jobId} was update with progress: ${job.data.porcentage}`)
  }

  @OnQueueEvent('completed')
  onCompleted(job: CompletedEventData) {
    this.eventEmitter.emit(`job.${job.jobId}.completed`, {
      ...job.returnvalue
    })
    this.logger.debug(`JobId: ${job.jobId} completed successfully! Compressed size: ${job.returnvalue.data.compressedSize}MB`)
  }
}

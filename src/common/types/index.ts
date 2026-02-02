import z from 'zod';
import {
  fileJobDataSchema,
  fileJobNamesSchema,
  fileToQueueSchema,
} from './file.queue.types';

export type FileToQueue = z.infer<typeof fileToQueueSchema>;
export type FileJobData = z.infer<typeof fileJobDataSchema>;
export type FileJobNames = z.infer<typeof fileJobNamesSchema>;

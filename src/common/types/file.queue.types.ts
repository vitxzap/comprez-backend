import { JobProgress } from 'bullmq';
import z from 'zod';

/**
 * This schema defines the values that will be added to the job.
 * The Id field defines the jobId as the same used by multer to generates the unique file folder.
 */
export const fileToQueueSchema = z.object({
  size: z.number(),
  path: z.string(),
  jobId: z.uuidv7(),
  userId: z.uuidv4()
});

/**
 * Defines the Job data type, omitting the id from FileToQueue, as id is not included in job data.
 * Add more data about the file if needed, just write them down.
 */
export const fileJobDataSchema = fileToQueueSchema
  .extend({})
  .omit({ jobId: true });

/**
 * Defines all the possible job names
 */
export const fileJobNamesSchema = z.enum(['compress']);


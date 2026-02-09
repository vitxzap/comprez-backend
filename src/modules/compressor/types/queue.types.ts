import z from 'zod';
import { CompressionLevel } from './compressor.types';

/**
 * This schema defines the values that will be added to the job.
 * The Id field defines the jobId as the same used by multer to generates the unique file folder.
 */
const queueParams = z.object({
  originalSize: z.number().positive(),
  originalName: z.string(),
  ext: z.string(),
  jobId: z.uuidv7(),
  userId: z.uuidv7(),
});

/**
 * Defines the Job data type, omitting the id from FileToQueue, as id is not included in job data.
 * Add more data about the file if needed, just write them down.
 */
const jobDataSchema = queueParams.extend({}).omit({ jobId: true })

/**
 * Defines all the possible job names
 */
const jobNamesSchema = z.enum(['compress']);

export const jobReturnValuesSchema = z.object({
  success: z.boolean(),
  data: z.object({
    compressedSize: z.number(),
    destination: z.url(),
    preset: z.custom<CompressionLevel>()
  })
})

export type QueueParams = z.infer<typeof queueParams>;
export type JobReturnValues = z.infer<typeof jobReturnValuesSchema>
export type JobData = z.infer<typeof jobDataSchema>;
export type JobNames = z.infer<typeof jobNamesSchema>;
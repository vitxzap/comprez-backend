/**
 * This interface defines the values that will be added to the job.
 * The Id field defines the jobId as the same used by multer to generates the unique file folder.
 */
export interface FileToQueue {
  size: number;
  path: string;
  id: string;
}

/**
 * Defines the Job data type, omitting the id from FileToQueue, as id is not included in job data.
 * Add more data about the file if needed, just put them at this interface.
 */
export interface FileJobData extends Omit<FileToQueue, 'id'> {}

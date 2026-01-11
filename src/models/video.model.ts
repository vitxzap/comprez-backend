import { IsEnum, IsInt, IsNumber, isPositive, IsString } from 'class-validator';
import z from 'zod';

const createCompressionOptionsSchema = z.object({
  /**
   * @param codec
   * Video codec that will be used in the compressed file.
   * @default codec = libx264
   */
  codec: z.enum(['libx264', 'libx265']).default('libx264').optional(),

  /**
   * @param crf
   * Controls the Constant Rate Factor (CRF), changing the quality of the compression. Higher the number, higher the compression level.
   * @default crf = 23
   */
  crf: z.coerce.number().min(1).max(51).default(23).optional(),

  /**
   * @param audioBitrate
   * Controls the audio bitrate in kbps. Lower values will decrease the final file size, but will impact the audio quality.
   * @default audioBitrate = 96
   */
  audioBitrate: z.coerce.number().min(48).max(192).default(96).optional(),

  /**
   * @param removeAudio
   * Decides if the audio will be removed in the compressed file.
   * @default removeAudio = false
   */
  removeAudio: z.boolean().default(false).optional(),

  /**
   * @param preset
   * Decides the algorithm speed level. The higher the speed, lower quality the video compression will have.
   * @default preset = medium
   */
  preset: z
    .enum([
      'veryslow',
      'slower',
      'slow',
      'medium',
      'fast',
      'faster',
      'veryfast',
      'superfast',
      'ultrafast'
    ])
    .default('medium')
    .optional()
});

/**
 * ### Video Compression Options
 * @param codec - Video codec that will be used in the compressed file.
 * @param crf - Controls the Constant Rate Factor (CRF), changing the quality of the compression. Higher the number, higher the compression level.
 * @param audioBitrate - Controls the audio bitrate in kbps. Lower values will decrease the final file size, but will impact the audio quality.
 * @param removeAudio - Decides if the audio will be removed in the compressed file.
 * @param preset - Decides the algorithm speed level. The higher the speed, lower quality the video compression will have.
 */
export type CompressionOptions = z.infer<typeof createCompressionOptionsSchema>;

import { ApiProperty } from '@nestjs/swagger';
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

const createCompressionlevel = z.enum(["low", "medium", "high"])
export type CompressionLevel = z.infer<typeof createCompressionlevel> 

export class VideoDto {
  @ApiProperty({
    type: 'string',
    description:
      'Up to 500MB, supports all video extensions: mp4, mkv, mov, webm, wmv, ogg and avi.'
  })
  file: Express.Multer.File;
}

/**
 * This schema is used to parse the ext and mimetype of the file sent by the video controller upload endpoint.
 * To validate another file types, simple create another schema following this example:
 * { ext: string, mime: string }
 */
export const validateVideoSchema = z.xor([
  z.object({
    ext: z.literal('mp4'),
    mime: z.literal('video/mp4')
  }),
  z.object({
    ext: z.literal('avi'),
    mime: z.literal('video/x-msvideo')
  }),
  z.object({
    ext: z.literal('mov'),
    mime: z.literal('video/quicktime')
  }),
  z.object({
    ext: z.literal('mkv'),
    mime: z.literal('video/x-matroska')
  }),
  z.object({
    ext: z.literal('ogg'),
    mime: z.literal('video/ogg')
  }),
  z.object({
    ext: z.literal('webm'),
    mime: z.literal('video/webm')
  }),
  z.object({
    ext: z.literal('x-ms-asf'),
    mime: z.literal('video/wmv')
  })
]);

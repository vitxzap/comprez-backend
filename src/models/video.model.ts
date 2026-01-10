import { IsEnum, IsInt, IsNumber, isPositive, IsString } from 'class-validator';
import z from 'zod';

const createCompressionOptionsSchema = z.object({
  codec: z.enum(['h264', 'h265']),
  crf: z.coerce.number().min(1).max(38),
  audioBitrate: z.coerce.number().min(48).max(192)
});

type CompressionOptions = z.infer<typeof createCompressionOptionsSchema>;

const teste: CompressionOptions = {
  codec: 'h265',
  crf: 38,
  audioBitrate: 82
};

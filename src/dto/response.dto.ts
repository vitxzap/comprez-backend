import { ApiProperty } from '@nestjs/swagger';
export class ErrorResponseDto {
  @ApiProperty({ required: true, description: "The error message." })
  message: string;
}

export class CompressResponseDto {
  @ApiProperty({ required: true, description: "The jobId of your file compression, use it to track the compression status" })
  jobId: string;
}


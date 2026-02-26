import { ApiProperty } from '@nestjs/swagger';
export class ErrorResponseDto {
  @ApiProperty({ required: true, description: "The error message." })
  message: string;
}




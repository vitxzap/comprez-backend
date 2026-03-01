import { ApiProperty } from '@nestjs/swagger';

//Defines the global error response dto
export class ErrorResponseDto {
  @ApiProperty({ required: true, description: "The error message." })
  message: string;
}


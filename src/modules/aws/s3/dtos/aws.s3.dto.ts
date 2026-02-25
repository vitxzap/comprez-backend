import { ApiProperty } from "@nestjs/swagger"
import { IsMimeType, IsString } from "class-validator"

export class CreatePresignedUrlDto {
    @ApiProperty()
    @IsString()
    filename: string

    @ApiProperty()
    @IsMimeType()
    mimetype: string
}
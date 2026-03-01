import { ApiProperty } from "@nestjs/swagger";
import { IsMimeType, IsString } from "class-validator"
import { Status } from "generated/prisma/enums";

export class RequestS3UploadDto {
    @ApiProperty({
        description: "The name that will be used to save the file",
        example: "my-new-video"
    })
    @IsString()
    filename: string

    @ApiProperty({
        description: "Used to generate the url with the correct Content-type/Mimetype",
        example: "image/png"
    })
    @IsMimeType()
    mimetype: string
}

export class S3UrlResponseDto {
    @ApiProperty({
        description: "The generated bucket url."
    })
    url: string
}

export class S3UploadResponseDto extends S3UrlResponseDto {
    @ApiProperty({
        description: "The compression id."
    })
    id: string
}

export class CompressionsResponseDto {
    @ApiProperty({
        description: "File original name."
    })
    originalName: string

    @ApiProperty({
        description: "The compression id."
    })
    id: string

    @ApiProperty({
        enum: Status,
        description: "The current status of the compression."
    })
    status: Status
}

import { ApiProperty } from "@nestjs/swagger";
import { IsMimeType, IsString } from "class-validator"

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

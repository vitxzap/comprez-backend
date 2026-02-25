import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator"
export class CompressDto {
    @ApiProperty({
        type: 'file',
        description:
            'Up to 500MB, supports all video extensions: mp4, webm, wmv, ogg and avi.'
    })
    file: Express.Multer.File;

    @ApiProperty({
        type: 'object',

        properties: {
            folderId: {
                type: "string",

            }
        },
        description: "Contains useful informations about how the compression will behave"
    })
    @IsObject()
    body: {
        uploadId: string
    }
}

export class CompressResponseDto {
    @ApiProperty({ required: true, description: "The jobId of your file compression, use it to track the compression status" })
    @IsString()
    jobId: string;
}



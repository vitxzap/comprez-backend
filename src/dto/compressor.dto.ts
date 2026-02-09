import { ApiProperty } from "@nestjs/swagger";

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
    body: {
        folderId: string
    }
}

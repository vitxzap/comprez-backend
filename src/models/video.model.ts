import { IsByteLength, IsNotEmpty, IsNumber } from "class-validator";



export class VideoDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty() 
    @IsByteLength(1, 9)
    size: string
}
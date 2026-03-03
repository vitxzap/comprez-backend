import { Compression } from "generated/prisma/client"
import { RequestS3UploadDto } from "../dtos/compressor.dto"

// Defines the shape of GetUserCompressionsById response
export type UserCompressions = Pick<Compression, "id" | "originalName" | "status">

export interface StoreCompressions extends RequestS3UploadDto {
    userId: string,
}
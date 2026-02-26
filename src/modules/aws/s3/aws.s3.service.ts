import { Inject, Injectable, Logger } from "@nestjs/common";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { CreatePresignedUrlDto } from "./dtos/aws.s3.dto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { ConfigService } from "@nestjs/config";
import { TypedEnv } from "config/env";
import { S3_CLIENT } from "./aws.s3.provider";
import { UUID } from "node:crypto";
@Injectable()
export class S3Service {
    constructor(
        private readonly configService: ConfigService<TypedEnv>,
        @Inject(S3_CLIENT) private readonly s3Client: S3Client
    ) { }


    //Creates a new PresignedUrl to the specified bucket and returns the url
    async createPresignedUrl(params: CreatePresignedUrlDto, userId: string) {
        const bucket = this.configService.getOrThrow("S3_BUCKET")
        const url = await getSignedUrl(this.s3Client, new PutObjectCommand({
            Bucket: bucket,
            Key: `uploads/${userId}/${params.filename}`,
            ContentType: params.mimetype
        }), { expiresIn: 3600 })
        return url;
    }
}
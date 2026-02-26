import { Inject, Injectable, } from "@nestjs/common";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { ConfigService } from "@nestjs/config";
import { TypedEnv } from "config/env";
import { S3_CLIENT } from "./aws.s3.provider";
@Injectable()
export class S3Service {
    constructor(
        private readonly configService: ConfigService<TypedEnv>,
        @Inject(S3_CLIENT) private readonly s3Client: S3Client
    ) {
        this.bucket = this.configService.getOrThrow("S3_BUCKET");
    }
    private readonly bucket: string;

    //Creates a new Presigned url to upload the file to the bucket and returns it
    async requestS3Upload(filename: string, contentType: string, userId: string) {
        const url = await getSignedUrl(this.s3Client, new PutObjectCommand({
            Bucket: this.bucket,
            Key: `uploads/${userId}/${filename}`,
            ContentType: contentType
        }), { expiresIn: 3600 })
        return url;
    }


    //Creates a new presigned url to download the file from the bucket and returns it
    async requestS3Download(key: string) {
        const url = await getSignedUrl(this.s3Client, new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        }))
        return url;
    }
}
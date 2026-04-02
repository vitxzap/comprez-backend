import { Injectable, } from "@nestjs/common";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { ConfigService } from "@nestjs/config";
import { TypedEnv } from "config/env";
import { GenerateS3Key } from "./types/s3.types";
@Injectable()
export class S3Service extends S3Client {
    private readonly bucket: string;
    private readonly uploadFolder: string;

    constructor(
        private readonly configService: ConfigService<TypedEnv>,
    ) {
        super({
            region: "sa-east-1", credentials: {
                accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY'),
                secretAccessKey: configService.getOrThrow("AWS_SECRET_KEY")
            }
        })
        this.bucket = this.configService.getOrThrow("S3_BUCKET");
        this.uploadFolder = this.configService.getOrThrow("S3_UPLOAD_FOLDER")
    }

    //Creates a new Presigned url to upload the file to the bucket and returns it
    async requestS3Upload(key: string, contentType: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
        })
        const url = await getSignedUrl(this, command, {
            expiresIn: 90,
            signableHeaders: new Set(["content-type"])
        })
        return url;
    }

    generateS3Key(payload: GenerateS3Key) {
        return `${this.uploadFolder}/${payload.userId}/${payload.compressionId}/${payload.filename}`
    }

    //Creates a new presigned url to download the file from the bucket and returns it
    async requestS3Download(key: string) {
        const url = await getSignedUrl(this, new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        }), { expiresIn: 3600 })
        return url;
    }
}
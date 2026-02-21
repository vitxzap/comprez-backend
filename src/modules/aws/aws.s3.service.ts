import { Injectable, Logger } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config";
import { TypedEnv } from "config/env";

@Injectable()
export class S3Service extends S3Client {
    constructor(configService: ConfigService<TypedEnv>) {
        super({
            region: "sa-east-1"
        })
    }
    private logger = new Logger(S3Service.name)
    async uploadObject(object: string) {
        await this.send(new PutObjectCommand({
            Bucket: "comprez",
            Key: "teste/teste.txt",
            Body: object
        }))
    }



}
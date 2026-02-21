import { Injectable, Logger } from "@nestjs/common";
import { S3Client } from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config";
import { TypedEnv } from "config/env";

@Injectable()
export class S3Service extends S3Client {
    constructor(configService: ConfigService<TypedEnv>) {
        super({
            credentials: {
                accessKeyId: configService.getOrThrow("S3_ACCESS_KEY"),
                secretAccessKey: configService.getOrThrow("S3_SECRET_KEY")
            }
        })
    }
    private logger = new Logger(S3Service.name)
    uploadObject(object: string) {

    }

}
import { S3Client } from "@aws-sdk/client-s3";
import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypedEnv } from "config/env";


// Creates a new S3Client injected into s3Service 
export const S3_CLIENT = Symbol("S3_PROVIDER");
export const S3ClientProvider: Provider = {
    provide: S3_CLIENT,
    inject: [ConfigService],
    useFactory: (configService: ConfigService<TypedEnv>) => new S3Client({
        region: "sa-east-1", credentials: {
            accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY'),
            secretAccessKey: configService.getOrThrow("AWS_SECRET_KEY")
        }
    })
}

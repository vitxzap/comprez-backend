import { S3Client } from "@aws-sdk/client-s3";
import { Provider } from "@nestjs/common";


// Creates a new S3Client injected into s3Service 
export const S3_CLIENT = Symbol("S3_PROVIDER");
export const S3ClientProvider: Provider = {
    provide: S3_CLIENT,
    useFactory: () => new S3Client({ region: "sa-east-1" })
}

import { Module } from "@nestjs/common";
import { S3Service } from "./aws.s3.service";
import { S3ClientProvider } from "./aws.s3.provider";


@Module({
    providers: [S3Service, S3ClientProvider],
    exports: [S3Service]
})
export class S3Module { }
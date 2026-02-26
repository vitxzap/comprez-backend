import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SqsModuleOptionsFactory, SqsOptions } from "@ssut/nestjs-sqs/dist/sqs.types";
import { TypedEnv } from "config/env";


@Injectable()
export class SqsConfigService implements SqsModuleOptionsFactory {
    constructor(private configService: ConfigService<TypedEnv>) { }
    createOptions(): Promise<SqsOptions> | SqsOptions {
        return {
            producers: [{
                name: "compressor-producer",
                queueUrl: this.configService.getOrThrow("SQS_COMPRESS_URL"),
                region: "sa-east-1"
            }]
        }
    }

}
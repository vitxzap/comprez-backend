import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypedEnv } from "config/env"
import { Flagsmith } from "flagsmith-nodejs"

export const FEATURE_FLAG = Symbol("FEATURE_FLAG")
export const FeatureFlagProvider: Provider = {
    provide: FEATURE_FLAG,
    inject: [ConfigService],
    useFactory: (configService: ConfigService<TypedEnv>) => new Flagsmith({
        environmentKey: configService.getOrThrow("FLAGSMITH_KEY")
    })
}
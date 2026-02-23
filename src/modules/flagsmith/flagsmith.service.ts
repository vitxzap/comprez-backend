import { Inject, Injectable, OnModuleInit, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypedEnv } from "config/env";
import { Flags, Flagsmith } from "flagsmith-nodejs";
import { FEATURE_FLAG } from "./flagsmith.provider";




@Injectable()
export class FeatureFlagService {
    constructor(@Inject(FEATURE_FLAG) private flagsmith: Flagsmith) { }

    async isFlagEnabled(flag: string) {
        const flags = await this.flagsmith.getEnvironmentFlags()
        return flags.isFeatureEnabled(flag);
    }

    async getEnvironmentFlags() {
        return await this.flagsmith.getEnvironmentFlags();
    }
}
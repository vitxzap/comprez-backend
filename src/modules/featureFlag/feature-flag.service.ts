import { Inject, Injectable } from "@nestjs/common";
import { TypedEnv } from "config/env";
import { Flags, Flagsmith } from "flagsmith-nodejs";
import { CACHED_FLAGS, FEATURE_FLAGS } from "./types/feature-flag.types";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager"
import { ConfigService } from "@nestjs/config";



@Injectable()
export class FeatureFlagService extends Flagsmith {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService<TypedEnv>) {
        super({
            environmentKey: configService.getOrThrow("FLAGSMITH_KEY")
        })
    }

    // Get all Feature Flags and cache then to improve performance and response time
    async getCachedFlags() {
        const cachedFlags = await this.cacheManager.get(CACHED_FLAGS)
        if (!cachedFlags) {
            const flags = await this.getEnvironmentFlags()
            await this.cacheManager.set(CACHED_FLAGS, flags)
        }
        return await this.cacheManager.get<Flags>(CACHED_FLAGS)
    }

    //Returns if the specified flag is enabled (Uses cache)
    async isCachedFlagEnabled(flag: FEATURE_FLAGS) {
        const isFlagEnabled = await this.getCachedFlags().then(
            (features: Flags) => features.isFeatureEnabled(flag)
        );
        return isFlagEnabled
    }

    //Returns specified flag values (Uses cache)
    async getCachedFlagValues(flag: FEATURE_FLAGS) {
        const flagValues = await this.getCachedFlags().then((features: Flags) => features?.getFeatureValue(flag))
        return flagValues
    }
}
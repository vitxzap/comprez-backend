import { Module } from "@nestjs/common";
import { FeatureFlagService } from "./flagsmith.service";
import { FeatureFlagProvider } from "./flagsmith.provider";


@Module({
    providers: [
        FeatureFlagProvider,
        FeatureFlagService],
    exports: [FeatureFlagService]
})
export class FeatureFlagModule { }
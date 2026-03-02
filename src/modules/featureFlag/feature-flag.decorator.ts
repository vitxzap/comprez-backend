import { Reflector } from "@nestjs/core";
import { FEATURE_FLAGS } from "src/modules/featureFlag/types/feature-flag.types";

export const FlagMetadata = Reflector.createDecorator<FEATURE_FLAGS>();
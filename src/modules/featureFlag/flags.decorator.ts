import { Reflector } from "@nestjs/core";
import { FEATURE_FLAGS } from "src/modules/featureFlag/types/types";

export const FlagMetadata = Reflector.createDecorator<FEATURE_FLAGS>();
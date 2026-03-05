import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FlagMetadata } from "../modules/featureFlag/feature-flag.decorator";
import { FeatureFlagService } from "../modules/featureFlag/feature-flag.service";

export interface RequestMimetype {
    body: {
        mimetype: string
    }
}
@Injectable()
export class MimetypeGuard implements CanActivate {
    constructor(private featureFlagService: FeatureFlagService, private reflector: Reflector) { }
    private logger = new Logger(MimetypeGuard.name)
    async canActivate(context: ExecutionContext) {
        const req: RequestMimetype = context.switchToHttp().getRequest();
        const flag = this.reflector.get(FlagMetadata, context.getHandler())
        this.logger.log(flag)
        const values: Array<string> = await this.featureFlagService.getCachedFlagValues(flag).then((data) => {
            if (data) {
                //Transforms the data into an JSON Object and returns only the allowed field
                const object = JSON.parse(data.toString())
                return object.allowed
            }
            return undefined
        })
        return values.includes(req.body.mimetype)
    }
}
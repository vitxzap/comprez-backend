import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FlagMetadata } from "src/modules/featureFlag/feature-flag.decorator";
import { FeatureFlagService } from "src/modules/featureFlag/feature-flag.service";

interface RequestMimetype {
    body: {
        mimetype: string
    }
}
@Injectable()
export class MimetypeGuard implements CanActivate {
    constructor(private featureFlagService: FeatureFlagService, private reflector: Reflector) { }
    async canActivate(context: ExecutionContext) {
        const req: RequestMimetype = context.switchToHttp().getRequest();
        const flag = this.reflector.get(FlagMetadata, context.getHandler())
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
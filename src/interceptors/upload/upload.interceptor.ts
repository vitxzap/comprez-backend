import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { v7 as uuidv7 } from "uuid";
import { UploadRequest } from "./types";

/**
* Intercepts the request and generates an uploadId.
* Use it before every file interceptor
*/
@Injectable()
export class UploadInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //Intercepts the request and generates an uuid used by multer an as messageId by sqs producer
        const req: UploadRequest = context.switchToHttp().getRequest();
        req.uploadId = uuidv7();
        return next.handle()
    }
}
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";


export interface StandardResponse<T> {
    data: T
    success: boolean,
    timestamp: string
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<StandardResponse<T>> | Promise<Observable<StandardResponse<T>>> {
        return next.handle().pipe(
            map((data) => ({
                data,
                success: true,
                timestamp: new Date().toISOString()
            }))
        )
    }
}
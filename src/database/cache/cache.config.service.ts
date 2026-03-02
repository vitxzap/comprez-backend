import { CacheOptions, CacheOptionsFactory } from "@nestjs/cache-manager";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
    createCacheOptions(): CacheOptions<Record<string, any>> | Promise<CacheOptions<Record<string, any>>> {
        return {
            ttl: 172800000 //2 Days
        }
    }
}
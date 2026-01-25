import { Injectable } from '@nestjs/common';
import {
  CacheModuleOptions,
  CacheOptionsFactory
} from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { ConfigService } from '@nestjs/config';
import { TypedEnv } from 'config/env';

/**
 * This class manage all redis/cache-module configs
 */
@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService<TypedEnv>) {}
  createCacheOptions(): CacheModuleOptions {
    const redisUrl = this.configService.getOrThrow('REDIS_URL');
    return {
      isGlobal: true,
      stores: [new KeyvRedis(redisUrl)]
    };
  }
}

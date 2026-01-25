import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory
} from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypedEnv } from 'config/env';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService<TypedEnv>) {}
  createSharedConfiguration():
    | Promise<BullRootModuleOptions>
    | BullRootModuleOptions {
    return {
      connection: {
        url: this.configService.getOrThrow('REDIS_URL'),
        password: this.configService.getOrThrow('REDIS_PASSWORD')
      }
    };
  }
}

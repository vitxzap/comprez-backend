import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'config/env';
import { PrismaModule } from './database/prisma/prisma.module';
import { CompressorModule } from './modules/compressor/compressor.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AUTH_CONFIG } from './config/auth/symbols';
import { AuthConfigModule } from './config/auth/auth.config.module';
import { BetterAuthOptions } from 'better-auth';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigService } from './database/cache/cache.config.service';
import { BullModule } from '@nestjs/bullmq';
import { QueueConfigService } from './config/queue/queue.config.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      envFilePath: '.env'
    }),
    EventEmitterModule.forRoot({
      global: true,
      wildcard: true,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService
    }),
    BullModule.forRootAsync({
      useClass: QueueConfigService
    }),
    AuthModule.forRootAsync({
      isGlobal: true,
      imports: [AuthConfigModule],
      inject: [AUTH_CONFIG],
      useFactory: (config: BetterAuthOptions) => {
        return {
          auth: config
        };
      }
    }),
    PrismaModule,
    CompressorModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }

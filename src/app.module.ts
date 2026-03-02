import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'config/env';
import { PrismaModule } from './database/prisma/prisma.module';
import { CompressorModule } from './modules/compressor/compressor.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AUTH_CONFIG } from './auth/symbols';
import { AuthConfigModule } from './auth/auth.config.module';
import { BetterAuthOptions } from 'better-auth';
import { SqsModule } from "@ssut/nestjs-sqs"
import { SqsConfigService } from './aws/config/sqs.config.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/response.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigService } from './database/cache/cache.config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      envFilePath: '.env'
    }),
    SqsModule.registerAsync({
      useClass: SqsConfigService
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    }
  ]
})
export class AppModule { }

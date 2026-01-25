import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'config/env';
import { PrismaModule } from './database/prisma/prisma.module';
import { VideoModule } from './modules/video/video.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AUTH_CONFIG } from './config/auth/symbols';
import { AuthConfigModule } from './config/auth/auth.config.module';
import { BetterAuthOptions } from 'better-auth';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigService } from './database/cache/cache.config.service';
import { BullModule } from '@nestjs/bullmq';
import { BullConfigService } from './config/queue/bull.config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      envFilePath: '.env'
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService
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
    VideoModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

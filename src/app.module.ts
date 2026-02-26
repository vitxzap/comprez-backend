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

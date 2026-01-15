import { AUTH_CONFIG } from './symbols';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { anonymous, openAPI } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TypedEnv } from 'config/env';

export const AuthConfigService = {
  provide: AUTH_CONFIG,
  inject: [ConfigService, PrismaService],
  useFactory: (
    configService: ConfigService<TypedEnv>,
    prismaService: PrismaService
  ) => {
    return betterAuth({
      plugins: [anonymous(), openAPI({ disableDefaultReference: true })],
      baseURL: configService.getOrThrow('BETTER_AUTH_URL'),
      secret: configService.getOrThrow('BETTER_AUTH_SECRET'),
      database: prismaAdapter(prismaService, {
        provider: 'postgresql'
      }),
      basePath: `${configService.getOrThrow("GLOBAL_PREFIX")}/auth`
    });
  }
};

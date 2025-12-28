import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { TypedEnv } from 'config/env';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly configService: ConfigService<TypedEnv>) {
    const db = configService.getOrThrow('DATABASE_URL')
    const adapter = new PrismaPg({
      connectionString: db
    });
    super({ adapter });
  }
}

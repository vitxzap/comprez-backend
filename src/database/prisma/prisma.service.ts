import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { TypedEnv } from 'config/env';
import { PrismaClient } from 'generated/prisma/client';
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService<TypedEnv>) {
    const adapter = new PrismaPg({
      host: configService.getOrThrow("POSTGRES_HOST"),
      password: configService.getOrThrow("POSTGRES_PASSWORD"),
      user: configService.getOrThrow("POSTGRES_USER"),
      database: configService.getOrThrow("POSTGRES_DB"),
      //AWS RDS needs this to create a connection without any SSL errors
      ssl: {
        rejectUnauthorized: false,
        ca: readFileSync("./certs/global-bundle.pem").toString()
      }
    });
    super({ adapter });
  }
  private logger = new Logger(PrismaService.name);

  // Methods used to health checks the database connection
  async onModuleInit() {
    try {
      await this.$connect()
      await this.$queryRaw`SELECT 1`; // DB Health check
      this.logger.debug("Database connected successfully")
    }
    catch (err: unknown) {
      this.logger.error(`Failed to connect to database:`)
      throw err
    }
  }

  //Destroys the database connection when the module is destroyed
  async onModuleDestroy() {
    try {
      await this.$disconnect()
      this.logger.debug("Database disconnected successfully")
    }
    catch (err: unknown) {
      this.logger.error(`Unexpected disconnection error:`)
      throw err;
    }
  }
}

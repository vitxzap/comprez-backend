import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { TypedEnv } from 'config/env';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService<TypedEnv>) {
    const db = configService.getOrThrow('DATABASE_URL');
    const adapter = new PrismaPg({
      connectionString: db,

      //AWS RDS needs this info to create a connection without any SSL errors
      ssl: {
        rejectUnauthorized: false
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

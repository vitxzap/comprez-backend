import { PrismaPg } from '@prisma/adapter-pg';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { anonymous, openAPI } from 'better-auth/plugins';
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL
  })
});
/**
 * This Variable is used by better-auth cli.
 * Make sure to *ALWAYS* have this updated with the AuthConfigService config options before running better-auth cli commands
 */
export const auth = betterAuth({
  plugins: [
    anonymous(),
    openAPI({
      disableDefaultReference: true
    })
  ],
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  })
});

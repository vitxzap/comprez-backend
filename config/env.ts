import z from 'zod';
import 'dotenv/config';

//Defines the env schema
const createEnvSchema = z.object({
  PORT: z.coerce.number().min(1).max(65536).default(3000),
  DATABASE_URL: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  GLOBAL_PREFIX: z.string().nonempty().default('v1'),
  POSTGRES_USER: z.string().nonempty(),
  BETTER_AUTH_SECRET: z.string().min(32).nonempty(),
  BETTER_AUTH_URL: z.url().nonempty(),
  SQS_COMPRESS_URL: z.url().nonempty(),
  S3_ACCESS_KEY: z.string().nonempty(),
  S3_SECRET_KEY: z.string().nonempty(),
  REDIS_PASSWORD: z.string().nonempty(),
  FLAGSMITH_KEY: z.string().nonempty(),
  REDIS_URL: z.string().nonempty()
});

//exports a parsed constant of process.env, it can be used all over the app
export const env = createEnvSchema.parse(process.env);

// Used to type ConfigService
export type TypedEnv = z.infer<typeof createEnvSchema>;

// Used in ConfigModule to validate enviroment variables
export function validate(config: Record<string, unknown>) {
  const parsed = createEnvSchema.parse(config);
  return parsed;
}

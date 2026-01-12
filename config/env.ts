import z from 'zod';
import 'dotenv/config';

//Defines the env schema
const createEnvSchema = z.object({
  PORT: z.coerce.number().min(1).default(3000),
  DATABASE_URL: z.string().nonempty(),
  BETTER_AUTH_SECRET: z.string().min(32).nonempty(),
  BETTER_AUTH_URL: z.url().nonempty()
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

import z from 'zod';
import 'dotenv/config';
const schema = z.object({
  PORT: z.coerce.number().min(1).default(3000),
  DATABASE_URL: z.string().nonempty(),
});

// Used to type ConfigService
export type TypedEnv = z.infer<typeof schema>;

//
export const env = schema.parse(process.env);

// Used in ConfigModule to validate enviroment variables
export function validate(config: Record<string, unknown>) {
  const parsed = schema.parse(config);
  return parsed;
}

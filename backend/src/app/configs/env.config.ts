import { z } from "zod";

const NODE_ENV_VALUES = ["development", "production"] as const;
const DEFAULT_NODE_ENV = "development" as const;
const DEFAULT_PORT = 3001;
const DEFAULT_CORS_ORIGIN = "*";

const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV_VALUES).default(DEFAULT_NODE_ENV),
  PORT: z.coerce.number().int().positive().default(DEFAULT_PORT),
  DB_STORAGE: z.string().optional(),
  DB_LOGGING: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  CORS_ORIGIN: z.string().default(DEFAULT_CORS_ORIGIN),
});

export type Env = z.infer<typeof envSchema>;

export const envConfig = envSchema.parse(process.env);

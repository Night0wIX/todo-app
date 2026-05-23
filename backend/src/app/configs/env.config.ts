import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(3001),

  DB_STORAGE: z.string().optional(),

  DB_LOGGING: z
    .string()
    .optional()
    .transform((v) => v === "true"),

  CORS_ORIGIN: z.string().default("*"),
});

export const envConfig = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;

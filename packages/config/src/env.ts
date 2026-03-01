import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    VERCEL: z.string().optional(),
  },
  server: {
    SPOTIFY_API_KEY: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

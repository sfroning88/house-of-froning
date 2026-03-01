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
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_ACCESS_CODE: z.string().min(1),
    SPOTIFY_ACCESS_TOKEN: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().min(1),
    GOOGLE_PRIVATE_KEY: z.string().min(1),
    GOOGLE_SHEET_ID: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

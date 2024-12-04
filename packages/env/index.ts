import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  VERCEL: z.string().optional(),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
  BLOB_READ_WRITE_TOKEN: z.string().min(1),
};

const client: Parameters<typeof createEnv>[0]['client'] = {
  NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
  NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
  NEXT_PUBLIC_API_URL: z.string().min(1).url().optional(),
  NEXT_PUBLIC_DOCS_URL: z.string().min(1).url().optional(),
  NEXT_PUBLIC_BLOB_STORAGE_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),
};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    VERCEL: process.env.VERCEL,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    NEXT_PUBLIC_BLOB_STORAGE_DOMAIN:
      process.env.NEXT_PUBLIC_BLOB_STORAGE_DOMAIN,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
});

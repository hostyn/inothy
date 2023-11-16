import z from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_FIREBASE: z.string(),
  NEXT_PUBLIC_FRONTEND_URL: z.string().url(),
  NEXT_PUBLIC_MIN_PRICE: z.string().transform(Number),
})

const serverEnvSchema = clientEnvSchema.extend({
  COOKIE_SECRET_CURRENT: z.string().min(20),
  COOKIE_SECRET_PREVIOUS: z.string().min(20),
  DATABASE_URL: z.string().url(),
  FIREBASE_ADMIN_CREDENTIALS: z.string().min(1),
  MANGOPAY_API_KEY: z.string().min(1),
  MANGOPAY_CLIENT_ID: z.string().min(1),
  MANGOPAY_ENDPOINT: z.string().url(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_URL: z.string().optional(),
})

const clientEnvServer = clientEnvSchema.safeParse(process.env)
const serverEnvServer = serverEnvSchema.safeParse(process.env)

if (!clientEnvServer.success) {
  throw new Error(clientEnvServer.error.message)
}

if (typeof window === 'undefined' && !serverEnvServer.success) {
  throw new Error(serverEnvServer.error.message)
}

export const clientEnv = clientEnvServer.data
export const serverEnv = serverEnvServer.success
  ? serverEnvServer.data
  : {
      COOKIE_SECRET_CURRENT: '',
      COOKIE_SECRET_PREVIOUS: '',
      DATABASE_URL: '',
      FIREBASE_ADMIN_CREDENTIALS: '',
      MANGOPAY_API_KEY: '',
      MANGOPAY_CLIENT_ID: '',
      MANGOPAY_ENDPOINT: '',
      NEXT_PUBLIC_FIREBASE: '',
      NEXT_PUBLIC_FRONTEND_URL: '',
      NEXT_PUBLIC_MIN_PRICE: '',
      NODE_ENV: '',
      VERCEL_URL: '',
    }

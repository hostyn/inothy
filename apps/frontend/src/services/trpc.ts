import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'

import type { AppRouter } from 'backend'
import { serverEnv } from 'env'

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (serverEnv.VERCEL_URL != null) return `https://${serverEnv.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:3000` // dev SSR should use localhost
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: opts =>
            serverEnv.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }
  },
  ssr: false,
})

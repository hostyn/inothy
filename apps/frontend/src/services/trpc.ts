import type { AppRouter } from 'backend'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') return ''
  if (process.env.NEXT_PUBLIC_FRONTEND_URL != null)
    return process.env.NEXT_PUBLIC_FRONTEND_URL
  return `http://localhost:3000`
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: opts =>
            process.env.NODE_ENV === 'development' ||
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

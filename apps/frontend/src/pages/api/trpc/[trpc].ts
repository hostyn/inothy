import { createNextApiHandler } from '@trpc/server/adapters/next'

import { appRouter } from 'backend'

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})

import initAuth from '@config/initAuth'
import {
  type CreateNextContextOptions,
  createNextApiHandler,
} from '@trpc/server/adapters/next'

import { appRouter } from 'backend'
import { createInnerTRPCContext } from 'backend/src/trpc'
import { getUserFromCookies } from 'next-firebase-auth'

initAuth()

const createTRPCContext = async ({
  req,
  res,
}: CreateNextContextOptions): Promise<any> => {
  const user = await getUserFromCookies({ req })
  return createInnerTRPCContext({ user, headers: req.headers })
}

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
})

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '110mb',
    },
    responseLimit: '110mb',
  },
}

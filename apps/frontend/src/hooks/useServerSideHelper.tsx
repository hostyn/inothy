import { appRouter, createInnerTRPCContext } from 'backend'
import { createServerSideHelpers } from '@trpc/react-query/server'
import SuperJSON from 'superjson'
import { type AuthUser } from 'next-firebase-auth'
import type { IncomingHttpHeaders } from 'http'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useServerSideHelper = (
  authUser: AuthUser,
  headers: IncomingHttpHeaders
) => {
  const context = createInnerTRPCContext({ user: authUser, headers })

  const helper = createServerSideHelpers({
    router: appRouter,
    ctx: context,
    transformer: SuperJSON,
  })

  return helper
}

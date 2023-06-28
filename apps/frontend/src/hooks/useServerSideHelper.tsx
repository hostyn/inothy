import { appRouter, createInnerTRPCContext } from 'backend'
import { createServerSideHelpers } from '@trpc/react-query/server'
import SuperJSON from 'superjson'
import { type AuthUser } from 'next-firebase-auth'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useServerSideHelper = (authUser: AuthUser) => {
  const context = createInnerTRPCContext({ user: authUser })

  const helper = createServerSideHelpers({
    router: appRouter,
    ctx: context,
    transformer: SuperJSON,
  })

  return helper
}

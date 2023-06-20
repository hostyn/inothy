import { TRPCError } from '@trpc/server'
import { createTRPCMiddleware } from '../trpc'

export const enforceUserIsAuthenticated = createTRPCMiddleware(
  async ({ ctx, next }) => {
    if (ctx.user.id == null) throw new TRPCError({ code: 'UNAUTHORIZED' })

    return await next()
  }
)

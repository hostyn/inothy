import { enforceUserIsAuthenticated } from './middleware/enforceUserIsAuthenticated'
import { trpc } from './trpc'

export const publicProcedure = trpc.procedure
export const protectedProcedure = trpc.procedure.use(enforceUserIsAuthenticated)

import { universitiesRouter } from './routes/universities'
import { authRouter } from './routes/auth'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  universities: universitiesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

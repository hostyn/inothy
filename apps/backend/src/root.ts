import { universitiesRouter } from './routes/universities'
import { authRouter } from './routes/auth'
import { createTRPCRouter } from './trpc'
import { documentRouter } from './routes/document'
import { userRouter } from './routes/user'
import { checkoutRouter } from './routes/checkout'
import { degreeRouter } from './routes/degree'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  universities: universitiesRouter,
  document: documentRouter,
  user: userRouter,
  checkout: checkoutRouter,
  degree: degreeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

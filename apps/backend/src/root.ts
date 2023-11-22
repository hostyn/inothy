import { universitiesRouter } from './routes/universities'
import { authRouter } from './routes/auth'
import { createTRPCRouter } from './trpc'
import { documentRouter } from './routes/document'
import { userRouter } from './routes/user'
import { reviewsRouter } from './routes/reviews'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  universities: universitiesRouter,
  document: documentRouter,
  user: userRouter,
  reviews: reviewsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

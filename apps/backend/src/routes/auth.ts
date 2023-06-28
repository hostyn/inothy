import { publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'

export const authRouter = createTRPCRouter({
  test: publicProcedure.query(async ({ ctx }) => {
    return { message: 'Hello world!' }
  }),
})

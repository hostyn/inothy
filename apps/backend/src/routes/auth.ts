import { publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'

export const authRouter = createTRPCRouter({
  test: publicProcedure.query(opts => 'hola que pasa'),
})

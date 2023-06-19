import { initTRPC } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { prisma } from 'prisma'
import superjson from 'superjson'
import { ZodError } from 'zod'

type CreateContextOptions = {
  user: undefined
}

export const createInnerTRPCContext = ({}: CreateContextOptions) => ({
  prisma,
})

export const createTRPCContext = async ({
  req,
  res,
}: CreateNextContextOptions) => {
  return createInnerTRPCContext({ user: undefined }) //const { req, res } = opts;
}

export const trpc = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = trpc.router
export const createTRPCMiddleware = trpc.middleware

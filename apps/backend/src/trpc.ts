import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { type PrismaClient, prisma } from 'prisma'
import { type AuthUser } from 'next-firebase-auth'

interface CreateContextOptions {
  user: AuthUser
}

export const createInnerTRPCContext = ({
  user,
}: CreateContextOptions): CreateContextOptions & { prisma: PrismaClient } => ({
  user,
  prisma,
})

export const trpc = initTRPC.context<typeof createInnerTRPCContext>().create({
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

import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { prisma } from 'prisma'
import { type AuthUser } from 'next-firebase-auth'
import type { NextApiRequest } from 'next'

interface CreateContextOptions {
  user: AuthUser
  req: NextApiRequest
}

export const createInnerTRPCContext = ({
  user,
  req,
}: CreateContextOptions): CreateContextOptions & { prisma: typeof prisma } => ({
  user,
  req,
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

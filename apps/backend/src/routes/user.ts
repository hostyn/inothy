import { createTRPCRouter } from '../trpc'
import { publicProcedure } from '../procedures'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          avatarUrl: true,
          documents: true,
          reviews: true,
          username: true,
          biography: true,
          phone: true,
          email: true,
          address: {
            select: {
              address1: true,
              address2: true,
              googleMapsAddress: true,
            },
          },
          website: true,
        },
      })
      if (user == null)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'user-not-found',
        })
      return user
    }),
})

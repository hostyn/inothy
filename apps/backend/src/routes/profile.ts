import { createTRPCRouter } from '../trpc'
import { publicProcedure } from '../procedures'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const profile = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          avatarUrl: true,
          documents: true,
          reviews: true,
          username: true,
          biography: true,
        },
      })
      if (profile == null)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'profile-not-found',
        })
      return profile
    }),
})

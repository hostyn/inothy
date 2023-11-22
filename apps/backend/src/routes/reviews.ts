import { TRPCError } from '@trpc/server'
import { publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'
import { z } from 'zod'

export const reviewsRouter = createTRPCRouter({
  getUserReviews: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userReviews = await ctx.prisma.review.findMany({
        where: {
          userId: input.userId,
        },
      })
      if (userReviews == null)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'reviews-not-found' })
      return userReviews
    }),
})

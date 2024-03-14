import { publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'
import { z } from 'zod'

export const degreeRouter = createTRPCRouter({
  getSubjects: publicProcedure
    .input(
      z.object({
        degree: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const degrees = await ctx.prisma.subjectWithYear.findMany({
        where: { degreeId: input.degree },
        select: {
          id: true,
          year: true,
          subject: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      })
      return degrees
    }),
})

import { z } from 'zod'
import { publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'

export const universitiesRouter = createTRPCRouter({
  getUniversities: publicProcedure.query(async ({ ctx }) => {
    const universities = await ctx.prisma.university.findMany({
      select: {
        id: true,
        logoUrl: true,
        name: true,
        symbol: true,
        schools: {
          select: {
            id: true,
            name: true,
            degrees: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    return universities
  }),

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

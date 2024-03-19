import { publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'

export const universitiesRouter = createTRPCRouter({
  getUniversities: publicProcedure.query(async ({ ctx }) => {
    const universities = await ctx.prisma.university.findMany({
      orderBy: {
        name: 'desc',
      },
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
})

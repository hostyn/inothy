import { publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'

export const authRouter = createTRPCRouter({
  getUserData: publicProcedure.query(async ({ ctx }) => {
    if (ctx.user.id == null) {
      return {}
    }

    const userData = await ctx.prisma.user.findUnique({
      where: { uid: ctx.user.id },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        biography: true,
        degreeId: true,
        email: true,
        uid: true,
      },
    })
    return userData
  }),

  test: publicProcedure.query(async ({ ctx }) => {
    return { message: 'Hello world!' }
  }),
})

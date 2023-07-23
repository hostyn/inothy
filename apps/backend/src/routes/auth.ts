import { z } from 'zod'
import { protectedProcedure, publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'
import { TRPCError } from '@trpc/server'

export const authRouter = createTRPCRouter({
  getUserData: publicProcedure.query(async ({ ctx }) => {
    if (ctx.user.id == null) {
      return null
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

  usernameAvailable: protectedProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(3, 'username-too-short')
          .max(30, 'username-too-long')
          .regex(
            /^[a-z_\d](?!.*?\.{2})[a-z._\d]{1,28}[a-z_\d]$/,
            'invalid-username'
          ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { username: input.username },
      })

      return user == null
    }),

  changeUsername: protectedProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(3, 'username-too-short')
          .max(30, 'username-too-long')
          .regex(
            /^[a-z_\d](?!.*?\.{2})[a-z._\d]{1,28}[a-z_\d]$/,
            'invalid-username'
          ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { uid: ctx.user.id ?? '' },
      })

      if (user?.username === input.username) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'already-username',
        })
      }

      const usernameExists = await ctx.prisma.user.findFirst({
        where: { username: input.username },
      })

      if (usernameExists != null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'username-already-exists',
        })
      }

      await ctx.prisma.user.update({
        where: { uid: ctx.user.id ?? '' },
        data: { username: input.username },
      })

      return { success: true }
    }),
})

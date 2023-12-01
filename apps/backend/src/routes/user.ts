import { createTRPCRouter } from '../trpc'
import { publicProcedure } from '../procedures'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { type Subject } from 'prisma'

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
        select: {
          avatarUrl: true,
          username: true,
          biography: true,
          phone: true,
          publicEmail: true,
          publicAddress: true,
          website: true,
        },
      })

      const reviews = await ctx.prisma.review.aggregate({
        where: {
          document: {
            user: {
              username: input.username,
            },
          },
        },
        _count: true,
        _avg: {
          rating: true,
        },
      })

      const documentCount = await ctx.prisma.document.count({
        where: {
          user: {
            username: input.username,
          },
        },
      })

      const subjectsUploaded = await ctx.prisma.subject.findMany({
        where: {
          Document: {
            some: {
              user: {
                username: input.username,
              },
            },
          },
        },
      })

      const subjectsUploadedByUniversity = subjectsUploaded.reduce<
        Record<string, Subject[]>
      >((acc, cur) => {
        const universityId = cur.universityId
        if (acc[universityId] != null) {
          acc[universityId].push(cur)
        } else {
          acc[universityId] = [cur]
        }
        return acc
      }, {})

      // TODO: add university name
      const universities = await ctx.prisma.university.findMany({
        where: {
          id: {
            in: Object.keys(subjectsUploadedByUniversity),
          },
        },
        select: {
          id: true,
          name: true,
        },
      })

      const universityWithSubjects = universities.map(university => ({
        ...university,
        subjects: subjectsUploadedByUniversity[university.id],
      }))

      if (user == null)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'user-not-found',
        })
      return {
        ...user,
        reviewsCount: reviews._count,
        reviewsAvg: reviews._avg.rating?.toFixed(2),
        documentCount,
        subjectUploaded: universityWithSubjects,
      }
    }),
})

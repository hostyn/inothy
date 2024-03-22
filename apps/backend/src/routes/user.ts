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
          isProfessor: true,
          isAcademy: true,
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
          documents: {
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

      const universities = await ctx.prisma.university.findMany({
        where: {
          id: {
            in: Object.keys(subjectsUploadedByUniversity),
          },
        },
        select: {
          id: true,
          name: true,
          symbol: true,
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
        universitiesUploaded: universityWithSubjects,
      }
    }),

  getDocuments: publicProcedure
    .input(
      z.object({
        username: z.string(),
        cursor: z.string().optional(),
        subjects: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = 10

      const documentsCount = await ctx.prisma.document.count({
        where: {
          user: {
            username: input.username,
          },
          subjectId:
            input.subjects != null && input.subjects.length > 0
              ? { in: input.subjects }
              : undefined,
        },
      })

      const documents = await ctx.prisma.document.findMany({
        cursor: input.cursor != null ? { id: input.cursor } : undefined,
        take: limit + 1,
        where: {
          user: {
            username: input.username,
          },
          subjectId:
            input.subjects != null && input.subjects.length > 0
              ? { in: input.subjects }
              : undefined,
        },

        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          title: true,
          price: true,
          contentType: true,
          previewImageUrl: true,
          ratingCount: true,
          ratingSum: true,
          subject: {
            select: {
              university: {
                select: {
                  id: true,
                  name: true,
                },
              },
              name: true,
              id: true,
            },
          },
        },
      })
      const nextCursor =
        documents.length > limit ? documents.pop()?.id : undefined

      return { documents, nextCursor, documentsCount }
    }),

  getReviews: publicProcedure
    .input(z.object({ username: z.string(), cursor: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const limit = 10

      const reviews = await ctx.prisma.review.findMany({
        cursor: input.cursor != null ? { id: input.cursor } : undefined,
        take: limit + 1,
        where: {
          document: {
            user: {
              username: input.username,
            },
          },
        },

        orderBy: {
          updatedAt: 'desc',
        },

        select: {
          comment: true,
          createdAt: true,
          rating: true,
          updatedAt: true,
          id: true,
          document: {
            select: {
              id: true,
              title: true,
              price: true,
              contentType: true,
              previewImageUrl: true,
            },
          },
          user: {
            select: {
              avatarUrl: true,
              username: true,
              isProfessor: true,
              isAcademy: true,
            },
          },
        },
      })

      const nextCursor = reviews.length > limit ? reviews.pop()?.id : undefined

      return { reviews, nextCursor }
    }),
})

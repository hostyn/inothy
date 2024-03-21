import { publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'
import { z } from 'zod'

export const degreeRouter = createTRPCRouter({
  getDegree: publicProcedure
    .input(
      z.object({
        degree: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const subjectsWithDocuments = await ctx.prisma.document.groupBy({
        by: ['subjectId'],
        where: {
          subject: {
            subjectsWithYear: {
              some: {
                degreeId: input.degree,
              },
            },
          },
        },

        _count: true,
      })

      const indexedSubjectsWithDocuments: Record<string, number> = {}

      subjectsWithDocuments.forEach(subject => {
        indexedSubjectsWithDocuments[subject.subjectId] = subject._count
      })

      const degree = await ctx.prisma.degree.findUnique({
        where: {
          id: input.degree,
        },

        select: {
          id: true,
          name: true,
          school: {
            select: {
              name: true,
              university: {
                select: {
                  name: true,
                  logoUrl: true,
                },
              },
            },
          },
          subjects: {
            orderBy: {
              subject: {
                code: 'asc',
              },
            },
            select: {
              year: true,
              subject: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
      })

      return {
        ...degree,
        subjects: degree?.subjects
          .filter(
            subject => indexedSubjectsWithDocuments[subject.subject.id] != null
          )
          .map(subject => ({
            ...subject.subject,
            year: subject.year,
            documentsCount: indexedSubjectsWithDocuments[subject.subject.id],
          })),
      }
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

  getDocuments: publicProcedure
    .input(
      z.object({
        degree: z.string(),
        cursor: z.string().optional(),
        filters: z
          .object({
            subjects: z.array(z.string()).optional(),
            documentTypes: z.array(z.string()).optional(),
            byHand: z.boolean().optional(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = 20

      const documentsCount = await ctx.prisma.document.count({
        where: {
          byHand: input.filters?.byHand,
          documentType: {
            name: {
              in: input.filters?.documentTypes,
            },
          },
          subject: {
            id: {
              in: input.filters?.subjects,
            },

            subjectsWithYear: {
              some: {
                degreeId: input.degree,
              },
            },
          },
        },
      })

      const documents = await ctx.prisma.document.findMany({
        cursor: input.cursor != null ? { id: input.cursor } : undefined,
        take: limit + 1,
        where: {
          byHand: input.filters?.byHand,
          documentType: {
            name: {
              in: input.filters?.documentTypes,
            },
          },
          subject: {
            id: {
              in: input.filters?.subjects,
            },

            subjectsWithYear: {
              some: {
                degreeId: input.degree,
              },
            },
          },
        },

        orderBy: {
          ratingCount: 'desc',
        },

        select: {
          id: true,
          description: true,
          title: true,
          price: true,
          contentType: true,
          user: {
            select: {
              username: true,
              uid: true,
              avatarUrl: true,
              isAcademy: true,
              isProfessor: true,
            },
          },
          documentType: {
            select: {
              name: true,
            },
          },
          byHand: true,
          ratingSum: true,
          ratingCount: true,
          calification: true,
          professor: true,
          year: true,
          previewPdfUrl: true,
          previewImageUrl: true,
          subject: {
            select: {
              university: {
                select: {
                  name: true,
                },
              },
              code: true,
              name: true,
              id: true,
            },
          },
          documentTransactions: {
            where: {
              user: {
                uid: ctx.user.id ?? '',
              },
              success: true,
            },
          },
        },
      })

      const nextCursor =
        documents.length > limit ? documents.pop()?.id : undefined

      const parsedDocuments = documents.map(document => {
        const { documentTransactions, ...rest } = document

        return {
          ...rest,
          bought: documentTransactions.length > 0,
        }
      })

      return { documents: parsedDocuments, documentsCount, nextCursor }
    }),
})

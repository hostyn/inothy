import { createTRPCRouter } from '../trpc'
import { protectedProcedure, publicProcedure } from '../procedures'
import { z } from 'zod'
import { getUserData } from '../util/getUserData'
import { TRPCError } from '@trpc/server'
import { storageAdmin } from 'firebase-admin-config'
import { v4 as uuidv4 } from 'uuid'
import { makePdfDocument, makePdfPreview } from '../util/processPdf'

export const documentRouter = createTRPCRouter({
  getDocumentTypes: publicProcedure.query(async ({ ctx }) => {
    const documentTypes = await ctx.prisma.documentType.findMany()
    return documentTypes
  }),

  getDocument: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const prismaDocument = await ctx.prisma.document.findUnique({
          where: {
            id: input.id,
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

        if (prismaDocument == null) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'document-not-found',
          })
        }

        const { documentTransactions, ...document } = prismaDocument

        return {
          ...document,
          bought: documentTransactions.length !== 0,
        }
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'document-not-found',
        })
      }
    }),

  upload: protectedProcedure
    .input(
      z.object({
        file: z.any(),
        subject: z.string(),
        documentTypeId: z.string(),
        title: z.string().min(3, 'title-too-short').max(100, 'title-too-long'),
        description: z.string().max(2000, 'description-too-long'),
        byHand: z.boolean(),
        year: z.number().int().optional(),
        calification: z.number().optional(),
        professor: z.string().optional(),
        price: z.number().min(1, 'price-too-low'),
        contentType: z.string(),
        extension: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userData = await getUserData(ctx.user)

      if (!userData.canUpload) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'user-cannot-upload',
        })
      }

      const documentType = await ctx.prisma.documentType.findUnique({
        where: { id: input.documentTypeId },
      })

      if (documentType == null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'document-type-not-found',
        })
      }

      const subject = await ctx.prisma.subject.findUnique({
        where: { id: input.subject },
        include: {
          university: true,
        },
      })

      if (subject == null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'subject-not-found',
        })
      }

      const documentIdentifier = uuidv4()
      const originalFilePath = `documents/${documentIdentifier}/original.${input.extension}`

      const originalFileRef = storageAdmin.file(originalFilePath)
      const fileStream = originalFileRef.createWriteStream({
        metadata: {
          contentType: input.contentType,
        },
      })

      try {
        await new Promise((resolve, reject) => {
          fileStream.on('finish', resolve)
          fileStream.on('error', reject)
          fileStream.end(Buffer.from(input.file, 'base64'))
        })
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'file-upload-failed',
        })
      }

      const getPreivewPath = async (): Promise<string | null> => {
        if (input.contentType !== 'application/pdf') return null

        const preivewPath = `documents/${documentIdentifier}/preview.pdf`
        const preview = await makePdfPreview({
          base64pdf: input.file,
          title: input.title,
          author: userData.username,
          subject: subject.name,
          university: subject.university.name,
        })

        const preivewRef = storageAdmin.file(preivewPath)
        const previewStream = preivewRef.createWriteStream({
          metadata: {
            contentType: 'application/pdf',
          },
        })

        await new Promise((resolve, reject) => {
          previewStream.on('finish', resolve)
          previewStream.on('error', reject)
          previewStream.end(Buffer.from(preview))
        })

        await preivewRef.makePublic()
        const previewUrl = preivewRef.publicUrl()

        return previewUrl
      }

      const previewUrl = await getPreivewPath()

      const document = await ctx.prisma.document.create({
        data: {
          title: input.title,
          description: input.description,
          byHand: input.byHand,
          year: input.year,
          calification: input.calification,
          professor: input.professor,
          price: input.price,
          contentType: input.contentType,
          originalFilePath,
          // filePath,
          previewPdfUrl: previewUrl,
          extension: input.extension,

          documentType: {
            connect: {
              id: input.documentTypeId,
            },
          },
          subject: {
            connect: {
              id: input.subject,
            },
          },
          user: {
            connect: {
              id: userData.id,
            },
          },
        },
        include: {
          subject: {
            include: {
              university: true,
            },
          },
        },
      })

      if (input.contentType !== 'application/pdf') {
        return document
      }

      // Improve PDF
      const enhancedPdf = await makePdfDocument({
        base64pdf: input.file,
        title: input.title,
        author: userData.username,
        subject: subject.name,
        university: subject.university.name,
        url: `https://inothy.com/document/${document.id}`,
      })

      const enhancedFilePath = `documents/${documentIdentifier}/document.${input.extension}`

      const enhancedFileRef = storageAdmin.file(enhancedFilePath)

      const enhancedPDFStream = enhancedFileRef.createWriteStream({
        metadata: {
          contentType: input.contentType,
        },
      })

      try {
        await new Promise((resolve, reject) => {
          enhancedPDFStream.on('finish', resolve)
          enhancedPDFStream.on('error', reject)
          enhancedPDFStream.end(Buffer.from(enhancedPdf))
        })
      } catch {}

      const enhancedDocument = await ctx.prisma.document.update({
        where: {
          id: document.id,
        },
        data: {
          enhancedFilePath,
        },
        include: {
          subject: {
            include: {
              university: true,
            },
          },
        },
      })

      return enhancedDocument
    }),

  getDownloadUrl: protectedProcedure
    .input(z.object({ documentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.findUnique({
        where: {
          id: input.documentId,
        },
        include: {
          documentTransactions: {
            where: {
              user: {
                uid: ctx.user.id ?? '',
              },
              success: true,
            },
          },
          user: true,
        },
      })

      if (document == null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'document-not-found',
        })
      }

      if (
        document.user.uid !== ctx.user.id &&
        document.documentTransactions.length === 0
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'document-not-bought',
        })
      }

      const file = storageAdmin.file(
        document.enhancedFilePath ?? document.originalFilePath
      )
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60,
      })

      return {
        url,
        documentName: `${document.title} - ${document.user.username} - Inothy.${document.extension}`,
      }
    }),

  getPurchasedDocuments: protectedProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = 10

      const documentsCountPromise = ctx.prisma.document.count({
        where: {
          documentTransactions: {
            some: {
              user: {
                uid: ctx.user.id ?? '',
              },
              success: true,
            },
          },
        },
      })

      const documents = await ctx.prisma.document.findMany({
        cursor: input.cursor != null ? { id: input.cursor } : undefined,
        take: limit + 1,
        where: {
          documentTransactions: {
            some: {
              user: {
                uid: ctx.user.id ?? '',
              },
              success: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
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
        },
      })

      const nextCursor =
        documents.length > limit ? documents.pop()?.id : undefined

      const documentsCount = await documentsCountPromise

      return { documents, nextCursor, documentsCount }
    }),

  getUploadedDocuments: protectedProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = 10

      const documentsCountPromise = ctx.prisma.document.count({
        where: {
          user: {
            uid: ctx.user.id ?? '',
          },
        },
      })

      const documents = await ctx.prisma.document.findMany({
        cursor: input.cursor != null ? { id: input.cursor } : undefined,
        take: limit + 1,
        where: {
          user: {
            uid: ctx.user.id ?? '',
          },
        },
        orderBy: {
          createdAt: 'desc',
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
        },
      })

      const nextCursor =
        documents.length > limit ? documents.pop()?.id : undefined

      const documentsCount = await documentsCountPromise

      return { documents, nextCursor, documentsCount }
    }),
})

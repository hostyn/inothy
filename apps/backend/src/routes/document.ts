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
      const document = await ctx.prisma.document.findUnique({
        where: {
          id: input.id,
        },
        include: {
          subject: {
            include: {
              university: true,
            },
          },
        },
      })
      if (document == null)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'document-not-found',
        })
      return document
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
      const filePath = `documents/${documentIdentifier}/document.${input.extension}`

      const fileRef = storageAdmin.file(filePath)
      const fileStream = fileRef.createWriteStream({
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
          filePath,
          previewUrl,

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

      // Improve PDF
      if (input.contentType === 'application/pdf') {
        const improvedPdf = await makePdfDocument({
          base64pdf: input.file,
          title: input.title,
          author: userData.username,
          subject: subject.name,
          university: subject.university.name,
          url: `https://inothy.com/document/${document.id}`,
        })

        const improvedPDFStream = fileRef.createWriteStream({
          metadata: {
            contentType: input.contentType,
          },
        })

        try {
          await new Promise((resolve, reject) => {
            improvedPDFStream.on('finish', resolve)
            improvedPDFStream.on('error', reject)
            improvedPDFStream.end(Buffer.from(improvedPdf))
          })
        } catch {}
      }

      return document
    }),
})

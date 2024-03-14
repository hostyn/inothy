import mangopay from '../config/mangopay'
import { getSellerAmount } from '../util/priceCalculator'
import { protectedProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import type { card } from 'mangopay2-nodejs-sdk'

export const checkoutRouter = createTRPCRouter({
  checkoutDocument: protectedProcedure
    .input(
      z.object({
        documentId: z.string(),
        documentPrice: z.number(),
        cardId: z.string(),
        browserInfo: z.object({
          acceptHeader: z.string(),
          colorDepth: z.number(),
          language: z.string(),
          screenHeight: z.number(),
          screenWidth: z.number(),
          timeZoneOffset: z.string(),
          userAgent: z.string(),
          javaEnabled: z.boolean(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userData = await ctx.prisma.user.findUnique({
        where: {
          uid: ctx.user.id ?? '',
        },
        include: {
          billing: true,
          mangopayUser: true,
          documentTransactions: {
            where: {
              documentId: input.documentId,
              success: true,
            },
          },
        },
      })

      if (userData?.documentTransactions.length !== 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'document-already-bought',
        })
      }

      const document = await ctx.prisma.document.findUnique({
        where: {
          id: input.documentId,
        },
        include: {
          user: {
            include: {
              mangopayUser: true,
            },
          },
        },
      })

      if (document == null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'document-not-found',
        })
      }

      if (document.price !== input.documentPrice) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'document-price-mismatch',
        })
      }

      const card = (await mangopay.Cards.get(input.cardId)) as card.CardData & {
        // Fix mangopay types
        UserId: string
      }

      if (card.UserId !== userData.mangopayUser?.mangopayId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'card-not-found',
        })
      }

      const forwardedFor = ctx.headers['x-forwarded-for'] as string | undefined
      const ipAddress = forwardedFor?.split(',')[0] ?? '127.0.0.1'

      const createPayInResponse = await mangopay.PayIns.create({
        AuthorId: userData.mangopayUser?.mangopayId ?? '',
        CreditedUserId: document.user.mangopayUser?.mangopayId,
        CreditedWalletId: document.user.mangopayUser?.walletId ?? '',
        DebitedFunds: {
          Currency: 'EUR',
          Amount: document.price * 100,
        },
        Fees: {
          Currency: 'EUR',
          Amount: (document.price - getSellerAmount(document.price)) * 100,
        },
        PaymentType: 'CARD',
        ExecutionType: 'DIRECT',
        CardId: input.cardId,
        SecureMode: 'DEFAULT',
        SecureModeReturnURL:
          (process.env.NEXT_PUBLIC_FRONTEND_URL as string) +
          '/checkout/callback',
        IpAddress: ipAddress,
        BrowserInfo: {
          AcceptHeader: input.browserInfo.acceptHeader,
          ColorDepth: input.browserInfo.colorDepth,
          Language: input.browserInfo.language,
          ScreenHeight: input.browserInfo.screenHeight,
          ScreenWidth: input.browserInfo.screenWidth,
          TimeZoneOffset: input.browserInfo.timeZoneOffset,
          UserAgent: input.browserInfo.userAgent,
          JavaEnabled: input.browserInfo.javaEnabled,
          JavascriptEnabled: true,
        },
      })

      if (createPayInResponse.Status === 'SUCCEEDED') {
        await ctx.prisma.transaction.create({
          data: {
            status: createPayInResponse.Status,
            transactionId: createPayInResponse.Id,
            user: {
              connect: {
                uid: ctx.user.id ?? '',
              },
            },
            documentTransactions: {
              create: {
                user: {
                  connect: {
                    uid: userData.uid,
                  },
                },
                success: true,
                document: {
                  connect: {
                    id: document.id,
                  },
                },
                price: document.price,
              },
            },
          },
        })

        return { state: 'success', id: createPayInResponse.Id }
      }

      if (createPayInResponse.Status === 'CREATED') {
        await ctx.prisma.transaction.create({
          data: {
            status: createPayInResponse.Status,
            transactionId: createPayInResponse.Id,
            user: {
              connect: {
                uid: ctx.user.id ?? '',
              },
            },
            documentTransactions: {
              create: {
                user: {
                  connect: {
                    uid: userData.uid,
                  },
                },
                success: false,
                document: {
                  connect: {
                    id: document.id,
                  },
                },
                price: document.price,
              },
            },
          },
        })

        return {
          state: 'created',
          id: createPayInResponse.Id,
          redirectUrl: createPayInResponse.SecureModeRedirectURL,
        }
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'transaction-failed',
      })
    }),

  getReceipt: protectedProcedure
    .input(
      z.object({
        receiptId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.transaction.findUnique({
        where: {
          transactionId: input.receiptId,
        },
        include: {
          documentTransactions: {
            include: {
              document: {
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
              },
            },
          },
          user: {
            select: {
              uid: true,
            },
          },
        },
      })

      if (
        transaction == null ||
        transaction.user.uid !== ctx.user.id ||
        transaction.status === 'CREATED'
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'transaction-not-found',
        })
      }

      return {
        status: transaction.status,
        documentTransactions: transaction.documentTransactions,
      }
    }),

  updateReceipt: protectedProcedure
    .input(
      z.object({
        transactionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const transaction = await mangopay.PayIns.get(input.transactionId)

      if (transaction.Status === 'FAILED') {
        const prismaTransaction = await ctx.prisma.transaction.update({
          where: {
            transactionId: input.transactionId,
          },
          data: {
            status: transaction.Status,
          },
          include: {
            user: {
              select: {
                uid: true,
              },
            },
          },
        })

        if (prismaTransaction.user.uid !== ctx.user.id) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'transaction-not-found',
          })
        }
        return prismaTransaction
      }

      if (transaction.Status === 'SUCCEEDED') {
        const prismaTransaction = await ctx.prisma.transaction.update({
          where: {
            transactionId: input.transactionId,
          },
          data: {
            status: transaction.Status,
            documentTransactions: {
              updateMany: {
                where: {},
                data: {
                  success: true,
                },
              },
            },
          },
          include: {
            user: {
              select: {
                uid: true,
              },
            },
          },
        })

        if (prismaTransaction.user.uid !== ctx.user.id) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'transaction-not-found',
          })
        }
        return prismaTransaction
      }

      const prismaTransaction = await ctx.prisma.transaction.findFirst({
        where: {
          transactionId: input.transactionId,
        },
        include: {
          user: {
            select: {
              uid: true,
            },
          },
        },
      })

      if (prismaTransaction == null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'transaction-not-found',
        })
      }
      return prismaTransaction
    }),
})

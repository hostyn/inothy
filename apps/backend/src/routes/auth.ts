import { z } from 'zod'
import { protectedProcedure, publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'
import { TRPCError } from '@trpc/server'
import { getUserData } from '../util/getUserData'
import { COUNTRIES } from '../config/countries'
import stripe from '../config/stripe'

// TODO: Handle all stripe errors.
const StripeErrors: Record<string, string> = {
  'individual[address][postal_code]': 'invalid-postal-code',
  'individual[address][city]': 'invalid-city',
  'individual[address][line1]': 'invalid-line1',
  'individual[phone]': 'invalid-phone-number',
}

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
        uid: true,
        usernameChangedDate: true,
        canUpload: true,
        canBuy: true,
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
      const userData = await getUserData(ctx.user)

      const addSixMonts = (date: Date): Date => {
        return new Date(date.getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
      }

      if (
        userData.usernameChangedDate != null &&
        addSixMonts(userData.usernameChangedDate) > new Date()
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'username-changed-recently',
        })
      }

      if (userData.username === input.username) {
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
        data: { username: input.username, usernameChangedDate: new Date() },
      })

      return { success: true }
    }),

  changeBiography: protectedProcedure
    .input(
      z.object({
        biography: z
          .string()
          .min(16, 'description-too-short')
          .max(300, 'description-too-long'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userData = await getUserData(ctx.user)

      await ctx.prisma.user.update({
        where: {
          uid: userData.uid,
        },
        data: {
          biography: input.biography,
        },
      })

      return { success: true }
    }),

  upgradeUserToSeller: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1, 'first-name-required'),
        lastName: z.string().min(1, 'last-name-required'),
        birthDate: z.number().refine(
          birthDate => {
            const date = new Date(birthDate)
            const today = new Date()

            const ageThresholdDate = new Date(
              today.getUTCFullYear() - 18,
              today.getUTCMonth(),
              today.getUTCDate(),
              23,
              59,
              59,
              999
            )

            return date <= ageThresholdDate
          },
          { message: 'underage' }
        ),
        country: z
          .string()
          .min(1, 'country-required')
          .refine(country => COUNTRIES.includes(country), {
            message: 'invalid-country',
          }),
        line1: z.string().min(1, 'line1-required'),
        line2: z.string().optional(),
        city: z.string().min(1, 'city-required'),
        region: z.string().optional(),
        postalCode: z.string().min(1, 'postal-code-required'),
        phone: z.string().min(1, 'phone-required'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userData = await ctx.prisma.user.findUnique({
        where: { uid: ctx.user.id ?? '' },
      })

      if (userData?.stripeAccountId != null) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'already-seller',
        })
      }

      const xForwardedFor = ctx.req.headers['x-forwarded-for']

      const clientIp =
        xForwardedFor != null
          ? Array.isArray(xForwardedFor)
            ? xForwardedFor[0]
            : String(xForwardedFor).split(',')[0].trim()
          : ctx.req.socket.remoteAddress

      const birthDate = new Date(input.birthDate)

      try {
        const stripeAccount = await stripe.accounts.create({
          type: 'custom',
          business_type: 'individual',
          capabilities: {
            transfers: { requested: true },
            card_payments: { requested: true },
          },
          business_profile: {
            mcc: '5815',
            url: `https://inothy.com/user/${userData?.username ?? ''}`,
          },
          tos_acceptance: {
            ip: clientIp,
            date: Math.floor(Date.now() / 1000),
          },
          country: input.country,
          individual: {
            first_name: input.firstName,
            last_name: input.lastName,
            email: ctx.user.email ?? '',
            phone: input.phone,
            address: {
              line1: input.line1,
              line2: input.line2,
              city: input.city,
              postal_code: input.postalCode,
              state: input.region,
            },
            dob: {
              day: birthDate.getUTCDate(),
              month: birthDate.getUTCMonth() + 1,
              year: birthDate.getUTCFullYear(),
            },
          },
          settings: {
            payouts: {
              schedule: {
                interval: 'manual',
              },
            },
          },
        })

        await ctx.prisma.user.update({
          where: { uid: ctx.user.id ?? '' },
          data: {
            canBuy: true,
            canUpload: true,
            stripeAccountId: stripeAccount.id,
            ip: clientIp,
            firstName: input.firstName,
            lastName: input.lastName,
            birthDate: new Date(input.birthDate),
            phone: input.phone,
            address: {
              create: {
                line1: input.line1,
                line2: input.line2,
                city: input.city,
                postalCode: input.postalCode,
                region: input.region,
                country: input.country,
              },
            },
          },
        })
      } catch (error) {
        console.log('error', error)
        console.log('catch', error.raw.param === 'individual[phone]')
        if (error.type !== 'StripeInvalidRequestError')
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'unexpected-error',
          })

        if (error.raw.param in StripeErrors) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: StripeErrors[error.raw.param],
          })
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'unexpected-error',
        })
      }
      return { success: true }
    }),
})

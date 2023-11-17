import { z } from 'zod'
import { protectedProcedure, publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'
import { TRPCError } from '@trpc/server'
import { getUserData } from '../util/getUserData'
import mangopay from '../config/mangopay'
import { COUNTRIES } from '../config/countries'
import type { CountryISO, user } from 'mangopay2-nodejs-sdk'

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

  upgradeToSeller: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'name-required'),
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
        nationality: z
          .string()
          .min(1, 'nationality-required')
          .refine(country => COUNTRIES.includes(country as CountryISO), {
            message: 'invalid-nationality',
          }),
        countryOfResidency: z
          .string()
          .min(1, 'country-of-residency-required')
          .refine(country => COUNTRIES.includes(country as CountryISO), {
            message: 'invalid-country-of-residency',
          }),
        address1: z.string().min(1, 'address1-required'),
        address2: z.string(),
        country: z
          .string()
          .min(1, 'country-required')
          .refine(country => COUNTRIES.includes(country as CountryISO), {
            message: 'invalid-country',
          }),
        city: z.string().min(1, 'city-required'),
        region: z.string().min(1, 'region-required'),
        postalCode: z.string().min(1, 'postal-code-required'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userData = await ctx.prisma.user.findUnique({
        where: { uid: ctx.user.id ?? '' },
        include: {
          mangopayUser: true,
        },
      })

      if (userData?.mangopayUser?.mangopayType === 'OWNER') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'already-owner',
        })
      }

      try {
        const mangopayUserData: user.CreateUserNaturalData = {
          PersonType: 'NATURAL',
          FirstName: input.name,
          LastName: input.lastName,
          Email: ctx.user.email ?? '',
          Address: {
            AddressLine1: input.address1,
            AddressLine2: input.address2,
            City: input.city,
            Region: input.region,
            PostalCode: input.postalCode,
            Country: input.country as CountryISO,
          },
          Birthday: Number((input.birthDate / 1000).toFixed(0)),
          Nationality: input.nationality as CountryISO,
          CountryOfResidence: input.countryOfResidency as CountryISO,
          UserCategory: 'OWNER',
          TermsAndConditionsAccepted: true,
        }

        const createMangopayUserResponse =
          userData?.mangopayUser == null
            ? await mangopay.Users.create(mangopayUserData)
            : await mangopay.Users.update({
                Id: userData.mangopayUser.id,
                ...mangopayUserData,
              })

        const walletId =
          userData?.mangopayUser?.mangopayWalletId ??
          (
            await mangopay.Wallets.create({
              Currency: 'EUR',
              Owners: [createMangopayUserResponse.Id],
              Description: 'Inothy Wallet',
            })
          ).Id

        await ctx.prisma.user.update({
          where: { uid: ctx.user.id ?? '' },
          data: {
            canBuy: true,
            canUpload: true,
            mangopayUser: {
              upsert: {
                create: {
                  mangopayId: createMangopayUserResponse.Id,
                  kycLevel: createMangopayUserResponse.KYCLevel,
                  mangopayType: 'OWNER',
                  mangopayWalletId: walletId,
                },
                update: {
                  mangopayId: createMangopayUserResponse.Id,
                  kycLevel: createMangopayUserResponse.KYCLevel,
                  mangopayType: 'OWNER',
                  mangopayWalletId: walletId,
                },
              },
            },
          },
        })
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'unexpected-error',
        })
      }

      return { success: true }
    }),
})

import { z } from 'zod'
import { protectedProcedure, publicProcedure } from '../procedures'
import { createTRPCRouter } from '../trpc'
import { TRPCError } from '@trpc/server'
import { getUserData } from '../util/getUserData'
import mangopay from '../config/mangopay'
import { COUNTRIES } from '../config/countries'
import type { CountryISO, user } from 'mangopay2-nodejs-sdk'
import { authAdmin } from 'firebase-admin-config'
import { sendTemplateEmail } from '../util/brevo'

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

  getUserFullData: protectedProcedure.query(async ({ ctx }) => {
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
        firstName: true,
        lastName: true,
        birthDate: true,
        nationality: true,
        countryOfResidence: true,
        billing: true,
      },
    })

    return userData
  }),

  getBillingData: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { uid: ctx.user.id ?? '' },
      select: {
        billing: true,
      },
    })

    if (user == null) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'unexpected-error',
      })
    }

    return user?.billing ?? null
  }),

  updateBillingData: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1, 'name-required'),
        lastName: z.string().min(1, 'last-name-required'),
        address1: z.string().min(1, 'address1-required'),
        address2: z.string().optional(),
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
    .mutation(async ({ input, ctx }) => {
      const userData = await getUserData(ctx.user)

      if (!userData.canBuy) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'cannot-buy',
        })
      }

      if (userData.mangopayUser == null || userData.billing == null) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'unexpected-error',
        })
      }

      try {
        await ctx.prisma.user.update({
          where: {
            uid: userData.uid,
          },
          data: {
            billing: {
              update: {
                firstName: input.firstName,
                lastName: input.lastName,
                address1: input.address1,
                address2: input.address2,
                city: input.city,
                region: input.region,
                postalCode: input.postalCode,
                country: input.country,
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
        countryOfResidence: z
          .string()
          .min(1, 'country-of-residency-required')
          .refine(country => COUNTRIES.includes(country as CountryISO), {
            message: 'invalid-country-of-residency',
          }),
        address1: z.string().min(1, 'address1-required'),
        address2: z.string().optional(),
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

      if (userData?.mangopayUser?.userType === 'OWNER') {
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
            AddressLine2: input.address2 ?? '',
            City: input.city,
            Region: input.region,
            PostalCode: input.postalCode,
            Country: input.country as CountryISO,
          },
          Birthday: Number((input.birthDate / 1000).toFixed(0)),
          Nationality: input.nationality as CountryISO,
          CountryOfResidence: input.countryOfResidence as CountryISO,
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
          userData?.mangopayUser?.walletId ??
          (
            await mangopay.Wallets.create({
              Currency: 'EUR',
              Owners: [createMangopayUserResponse.Id],
              Description: 'Default Wallet',
            })
          ).Id

        await ctx.prisma.user.update({
          where: { uid: ctx.user.id ?? '' },
          data: {
            canBuy: true,
            canUpload: true,
            firstName: input.name,
            lastName: input.lastName,
            birthDate: new Date(input.birthDate),
            nationality: input.nationality,
            countryOfResidence: input.countryOfResidence,
            billing: {
              upsert: {
                create: {
                  firstName: input.name,
                  lastName: input.lastName,
                  address1: input.address1,
                  address2: input.address2,
                  city: input.city,
                  region: input.region,
                  postalCode: input.postalCode,
                  country: input.country,
                },
                update: {},
              },
            },
            mangopayUser: {
              upsert: {
                create: {
                  mangopayId: createMangopayUserResponse.Id,
                  kycLevel: createMangopayUserResponse.KYCLevel,
                  userType: 'OWNER',
                  walletId,
                },
                update: {
                  mangopayId: createMangopayUserResponse.Id,
                  kycLevel: createMangopayUserResponse.KYCLevel,
                  userType: 'OWNER',
                  walletId,
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

  getKYCStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserData(ctx.user)
    if (user.mangopayUser == null) {
      return {
        userType: null,
      }
    }

    return {
      userType: user.mangopayUser.userType as 'OWNER' | 'PAYER',
      kycLevel: user.mangopayUser.kycLevel as 'LIGHT' | 'REGULAR',
      kycStatus: user.mangopayUser.kycStatus as
        | 'CREATED'
        | 'VALIDATION_ASKED'
        | 'VALIDATED'
        | 'REFUSED'
        | 'OUT_OF_DATE'
        | null,
    }
  }),

  submitKYC: protectedProcedure
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
        countryOfResidence: z
          .string()
          .min(1, 'country-of-residency-required')
          .refine(country => COUNTRIES.includes(country as CountryISO), {
            message: 'invalid-country-of-residency',
          }),
        address1: z.string().min(1, 'address1-required'),
        address2: z.string().optional(),
        country: z
          .string()
          .min(1, 'country-required')
          .refine(country => COUNTRIES.includes(country as CountryISO), {
            message: 'invalid-country',
          }),
        city: z.string().min(1, 'city-required'),
        region: z.string().min(1, 'region-required'),
        postalCode: z.string().min(1, 'postal-code-required'),
        documentType: z.union([z.literal('id'), z.literal('passport')]),
        files: z.array(
          z.string({
            invalid_type_error: 'invalid-file',
            required_error: 'invalid-file',
          }),
          {
            invalid_type_error: 'invalid-files',
            required_error: 'files-required',
          }
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (
        input.files.length === 0 ||
        (input.documentType === 'id' && input.files.length !== 2) ||
        (input.documentType === 'passport' && input.files.length !== 1)
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'files-required',
        })
      }

      const user = await getUserData(ctx.user)

      if (user.mangopayUser == null || user.mangopayUser.userType === 'PAYER') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'not-seller',
        })
      }

      if (user.mangopayUser.kycLevel === 'REGULAR') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'already-verified',
        })
      }

      if (user.mangopayUser.kycStatus === 'VALIDATION_ASKED') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'already-asked',
        })
      }

      try {
        await mangopay.Users.update({
          Id: user.mangopayUser.mangopayId,
          PersonType: 'NATURAL',
          FirstName: input.name,
          LastName: input.lastName,
          Address: {
            AddressLine1: input.address1,
            AddressLine2: input.address2 ?? '',
            City: input.city,
            Region: input.region,
            PostalCode: input.postalCode,
            Country: input.country as CountryISO,
          },
          Birthday: Number((input.birthDate / 1000).toFixed(0)),
          Nationality: input.nationality as CountryISO,
          CountryOfResidence: input.countryOfResidence as CountryISO,
        })

        const createKycResponse = await mangopay.Users.createKycDocument(
          user.mangopayUser.mangopayId,
          {
            Type: 'IDENTITY_PROOF',
          }
        )

        await Promise.all(
          input.files.map(async file => {
            await mangopay.Users.createKycPage(
              user.mangopayUser?.mangopayId as string,
              createKycResponse.Id,
              {
                File: file,
              }
            )
          })
        )

        const kycDocument = await mangopay.Users.updateKycDocument(
          user.mangopayUser.mangopayId,
          {
            Id: createKycResponse.Id,
            Status: 'VALIDATION_ASKED',
          }
        )

        const mangopayUser = await mangopay.Users.get(
          user.mangopayUser.mangopayId
        )

        await ctx.prisma.user.update({
          where: { uid: ctx.user.id ?? '' },
          data: {
            firstName: input.name,
            lastName: input.lastName,
            birthDate: new Date(input.birthDate),
            nationality: input.nationality,
            countryOfResidence: input.countryOfResidence,
            mangopayUser: {
              update: {
                kycId: kycDocument.Id,
                kycStatus: kycDocument.Status,
                kycLevel: mangopayUser.KYCLevel,
                userType: mangopayUser.UserCategory,
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

  sendVerificationEmail: protectedProcedure.mutation(async ({ ctx }) => {
    // const user = await ctx.prisma.user.findUnique({
    //   where: { uid: ctx.user.id ?? '' },
    // })

    // if (user == null) {
    //   throw new TRPCError({
    //     code: 'INTERNAL_SERVER_ERROR',
    //     message: 'unexpected-error',
    //   })
    // }

    if (ctx.user.emailVerified) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'already-verified',
      })
    }

    try {
      const verificationUrl = await authAdmin.generateEmailVerificationLink(
        ctx.user.email as string
      )

      await sendTemplateEmail(5, ctx.user.email ?? '', {
        url: verificationUrl,
      })
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'unexpected-error',
      })
    }
  }),
})

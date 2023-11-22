import { TRPCError } from '@trpc/server'
import { type AuthUser } from 'next-firebase-auth'
import { type User, type MangopayUser, prisma, type Address } from 'prisma'

export const getUserData = async (
  user: AuthUser
): Promise<
  User & {
    address: Address | null
    mangopayUser: MangopayUser | null
  }
> => {
  const userData = await prisma.user.findUnique({
    where: { uid: user.id ?? '' },
    include: {
      mangopayUser: true,
      address: true,
    },
  })

  if (userData == null)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'user-not-found',
    })
  return userData
}

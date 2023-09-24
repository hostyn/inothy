import { TRPCError } from '@trpc/server'
import { type AuthUser } from 'next-firebase-auth'
import { type User, prisma } from 'prisma'

export const getUserData = async (user: AuthUser): Promise<User> => {
  const userData = await prisma.user.findUnique({
    where: { uid: user.id ?? '' },
  })

  if (userData == null)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'user-not-found',
    })
  return userData
}

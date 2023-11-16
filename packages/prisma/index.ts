import { PrismaClient } from '@prisma/client'
import { serverEnv } from 'env'

export * from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      serverEnv.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (serverEnv.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

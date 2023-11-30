import { authAdmin } from 'firebase-admin-config'
import { PrismaClient, type User } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

interface CreateUser {
  username?: string
  email?: string
}

export default async function createUser({
  username,
  email,
}: CreateUser = {}): Promise<User> {
  const userEmail = email ?? faker.internet.email()

  const user = await authAdmin.createUser({
    email: userEmail,
    password: 'test1234',
    emailVerified: true,
  })

  const prismaUser = await prisma.user.create({
    data: {
      uid: user.uid,
      username: username ?? faker.internet.userName(),
      biography: faker.person.bio(),
      website: faker.internet.url(),
      phone: faker.phone.number(),
    },
  })

  console.log('[*] Created user: ', userEmail, ':', 'test1234')

  return prismaUser
}

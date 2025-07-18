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
      biography: faker.lorem.paragraphs({ max: 5, min: 2 }),
      website: faker.internet.url(),
      phone: faker.phone.number(),
      publicAddress: faker.location.streetAddress(),
      publicEmail: faker.internet.email(),
      instagram: 'https://www.instagram.com/' + (username ?? ''),
      avatarUrl: 'https://avatars.githubusercontent.com/u/65368562?v=4',
    },
  })

  console.log('[*] Created user: ', userEmail, ':', 'test1234')

  return prismaUser
}

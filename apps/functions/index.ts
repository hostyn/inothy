/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client'
import * as functions from 'firebase-functions'

const client = new PrismaClient({
  log: ['info', 'query', 'warn'],
})

const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const user = await client.user.findUnique({
    where: {
      username,
    },
  })
  return user === null
}

const generateUsername = async (): Promise<string> => {
  const allowedCharacter =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let username = 'user_'
  for (let i = 0; i < 6; i++) {
    const caracterAleatorio =
      allowedCharacter[Math.floor(Math.random() * allowedCharacter.length)]
    username += caracterAleatorio
  }

  if (await isUsernameAvailable(username)) return username
  return await generateUsername()
}

export const onRegister = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async user => {
    const username = await generateUsername()

    await client.user.create({
      data: {
        uid: user.uid,
        username,
      },
    })
  })

import { prisma } from './services'

const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  return user === null
}

export const generateUsername = async (): Promise<string> => {
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

import MangoPay from 'mangopay2-nodejs-sdk'
import { PrismaClient } from '@prisma/client'

export const mangopay = new MangoPay({
  clientId: process.env.MANGOPAY_CLIENT_ID as string,
  clientApiKey: process.env.MANGOPAY_API_KEY as string,
  baseUrl: process.env.MANGOPAY_ENDPOINT,
})

export const prisma = new PrismaClient({
  log: ['warn', 'error'],
})

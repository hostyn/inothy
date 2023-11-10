import MangoPay from 'mangopay2-nodejs-sdk'

const mangopay = new MangoPay({
  clientId: process.env.MANGOPAY_CLIENT_ID as string,
  clientApiKey: process.env.MANGOPAY_API_KEY as string,
  baseUrl: process.env.MANGOPAY_ENDPOINT as string,
})

export default mangopay

import MangoPay from 'mangopay2-nodejs-sdk'

const mangopay = new MangoPay({
  clientId: process.env.MANGOPAY_CLIENT_ID,
  clientApiKey: process.env.MANGOPAY_API_KEY,
  baseUrl: process.env.MANGOPAY_ENDPOINT
})

export default mangopay

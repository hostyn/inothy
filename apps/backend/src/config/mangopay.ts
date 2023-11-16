import { serverEnv } from 'env'
import MangoPay from 'mangopay2-nodejs-sdk'

const mangopay = new MangoPay({
  clientId: serverEnv.MANGOPAY_CLIENT_ID,
  clientApiKey: serverEnv.MANGOPAY_API_KEY,
  baseUrl: serverEnv.MANGOPAY_ENDPOINT,
})

export default mangopay

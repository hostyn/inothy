import MangoPay from 'mangopay2-nodejs-sdk'
import {
  MANGOPAY_API_KEY,
  MANGOPAY_CLIENT_ID,
  MANGOPAY_ENDPOINT,
} from './constants'

const mangopay = new MangoPay({
  clientId: MANGOPAY_CLIENT_ID,
  clientApiKey: MANGOPAY_API_KEY,
  baseUrl: MANGOPAY_ENDPOINT,
})

export default mangopay

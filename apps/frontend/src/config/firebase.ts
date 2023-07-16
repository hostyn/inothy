import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent as logEventAnalytics } from 'firebase/analytics'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { FIREBASE_PUBLIC } from '@config/constants'

const firebaseConfig = JSON.parse(FIREBASE_PUBLIC)

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

export const analytics =
  typeof window !== 'undefined' ? getAnalytics(app) : null

export const logEvent = (event: string, params?: any): void => {
  analytics != null && logEventAnalytics(analytics, event, params)
}

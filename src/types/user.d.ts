import { type User as FirebaseUser } from 'firebase/auth'

interface UserData {
  address?: {
    address1?: string
    address2?: string
    city?: string
    postalCode?: string
    region?: string
  }
  badge?: string[]
  biography?: string
  bought?: string[]
  createdAt?: string
  degree?: string
  email?: string
  hasUploaded?: boolean
  ipAddress?: string
  mangopayClientId?: string
  mangopayKYCStatus?: string | null
  mangopayWalletId?: string | null
  name?: string
  profileCompleted?: boolean
  ref?: string
  school?: string
  surname?: string
  uid: string
  university?: string
  uploaded?: string[]
  username?: string
}

interface User extends FirebaseUser {
  data?: UserData
}

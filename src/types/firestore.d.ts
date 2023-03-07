import type { CountryISO, kycDocument, user } from 'mangopay2-nodejs-sdk'

interface FirestoreUser {
  address?: {
    address1: string
    address2: string | null
    city: string
    postalCode: string
    region: string
    country: CountryISO
  }
  badge?: string[]
  biography?: string
  birthday?: number | null
  bought?: string[]
  countryOfResidence?: string | null
  createdAt: number
  degree?: string
  email: string
  hasUploaded?: boolean
  ipAddress?: string
  mangopayClientId?: string
  mangopayKYCId?: string | null
  mangopayKYCLevel?: user.KYCLevel
  mangopayKYCRefusedReasonMessage?: string | null
  mangopayKYCRefusedReasonType?: kycDocument.KYCDocumentRefusedReasonType | null
  mangopayKYCStatus?: kycDocument.DocumentStatus | null
  mangopayType?: user.UserCategory
  mangopayWalletId?: string | null
  name?: string
  nationality?: string | null
  profileCompleted: boolean
  ref?: string | null
  school?: string
  surname?: string
  uid: string
  university?: string
  uploaded?: string[]
  username?: string
}

interface FirestoreUniversity {
  logoUrl: string
  name: string
  symbol: string
  url: string
}

interface FirestoreSchool {
  name: string
}

interface FirestoreSubjectInDegree {
  code: string
  id: string
  name: string
  year: number
}

interface FirestoreDegree {
  name: string
  subjects: FirestoreSubjectInDegree[]
  years: number
}

interface FirestoreSubject {
  code: string
  maxPrice: number
  name: string
  university: string
}

type VerificationStatus = 'not_asked' | 'asked' | 'verificated' | 'denied'

interface FirestoreDocument {
  contentType: string
  createdAt: number
  createdBy: string
  description: string
  file: string
  fileName: string
  name: string
  preview: boolean
  price: number
  rating: number | null
  sales: number
  totalRatings: number
  verificationStatus: VerificationStatus
}

// interface Recipt {
//   createdBy: string
//   creationDate: number
//   fees: number
//   path: string
//   price: number
//   transactionId: string
// }

// interface FirestoreTransaction {
//   amount: number
//   author: string
//   authorId: string
//   authorWalletId: string
//   cardId: string
//   creationDate: number
//   payInId: string
//   recipts: Recipt[]
//   status: string
// }

interface FirestoreReferral {
  ref: string
}

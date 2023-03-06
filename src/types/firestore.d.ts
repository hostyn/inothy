interface FirestoreUser {
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
  year: string
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

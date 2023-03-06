import { type UserRecord } from 'firebase-admin/lib/auth/user-record'

type Method = 'GET' | 'POST'

interface ApiUser extends Omit<UserRecord, 'toJSON'> {
  data: FirestoreUser
}

interface University {
  url: string
  logoUrl: string
  symbol: string
  id: string
  name: string
}

interface School {
  name: string
  id: string
}

interface UniversityWithSchools extends University {
  schools: School[]
}

interface Subject {
  year: number
  id: string
  name: string
  code: string
}

interface Degree {
  name: string
  id: string
  years: number
  subjects: Subject[]
}

interface SchoolWithDegree extends School {
  degrees: Degree[]
}

interface Document {
  contentType: string
  createdAt: {
    _nanoseconds: number
    _seconds: number
  }
  createdBy: string
  description: string
  file: string
  fileName: string
  id: string
  name: string
  preview: boolean
  price: number
  rating: number | null
  sales: number
  totalRatings: number
  verified: boolean
}

interface SubjectWithDocuments extends Subject {
  docs: Document[]
}

interface DegreeWithDocuments extends Degree {
  subjects: SubjectWithDocuments[]
}

interface UploadData {
  name: string
  description: string
  subject: string
  filePath: string
  requestVerification: boolean
  price: number
}

interface CompleteProfileData {
  name: string
  surname: string
  username: string
  address1: string
  address2: string
  city: string
  region: string
  postalCode: string
  university: string
  school: string
  degree: string
  biography: string
}

interface SubjectWithDocumentsAndUniveristy extends Subject {
  university: University
  year: undefined
  maxPrice: number
  docs: Document[]
  last: null
}

interface FullDocumentInfo extends Document {
  subject: Subject
  university: University
  createdById: string
}

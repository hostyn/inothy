import { type UserRecord } from 'firebase-admin/lib/auth/user-record'
import type { IncomingHttpHeaders } from 'http2'
import type { FirestoreUser } from './firestore'

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
  createdAt: number
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

interface SubjectWithDocumentsAndUniveristy extends Omit<Subject, 'year'> {
  university: University
  maxPrice: number
  docs: Document[]
  last: string | null
}

interface FullDocumentInfo extends Document {
  subject: Omit<Subject, 'year'>
  university: University
  createdById: string
}

interface CreateCardRegistration {
  Id: string
  PreregistrationData: string
  AccessKey: string
  CardRegistrationUrl: string
}

interface CompleteKYC {
  name: string
  surname: string
  email: string
  address1: string
  address2: string
  city: string
  region: string
  postalCode: string
  birthday: string
  nationality: string
  files: string[]
}

interface BuyParams {
  cardId: string
  headers: IncomingHttpHeaders
  productsPaths: string[]
}

interface BuyResponse {
  success: boolean
  status: 'SUCCEEDED' | 'CREATED'
  redirectUrl?: string
}

interface GetUserResponse {
  username: string
  uploaded: string[]
  university: University
  school: School
  degree: Degree
  biography: string
}

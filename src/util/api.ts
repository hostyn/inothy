import { FRONTEND_URL } from '@config/constants'
import type {
  BuyParams,
  BuyResponse,
  CompleteKYC,
  CompleteProfileData,
  CreateCardRegistration,
  DegreeWithDocuments,
  FullDocumentInfo,
  SchoolWithDegree,
  SubjectWithDocumentsAndUniveristy,
  University,
  UniversityWithSchools,
  UploadData,
} from 'types/api'
import { auth, logEvent } from '@config/firebase'
import type { bankAccount, card } from 'mangopay2-nodejs-sdk'
import type { FirestoreUser } from 'types/firestore'

const getIdToken = (): Promise<string> | undefined =>
  auth.currentUser?.getIdToken()

export async function isUsernameAvailable(username: string): Promise<boolean> {
  if (username.length === 0) throw new Error('Username is not defined')
  const res = await fetch(
    `${FRONTEND_URL}/api/isusernameavailable?` +
      new URLSearchParams({
        username,
      }).toString(),
    {
      method: 'GET',
    }
  )

  if (res.status !== 200) throw new Error('Unexpected exception')

  const { available } = await res.json()
  return available as boolean
}

export async function getUserData(): Promise<FirestoreUser> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/userdata`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  const data = (await res.json()) as FirestoreUser
  return data
}

export async function sendVerificationEmail(): Promise<void> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/sendverificationemail`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
  if (res.status === 200) {
    return
  }

  if (res.status === 429) throw new Error('too-many-requests')
  throw new Error('error')
}

export async function getUniversities(): Promise<University[]> {
  const response = await fetch(`${FRONTEND_URL}/api/universities`, {
    method: 'GET',
  })

  if (response.status === 200) {
    return (await response.json()) as University[]
  }

  throw new Error('Internal server error')
}

export async function getUniversity(
  universityId: string
): Promise<UniversityWithSchools> {
  if (universityId.length === 0) throw new Error('University ID Is Required')

  const response = await fetch(
    `${FRONTEND_URL}/api/universities/${universityId}`,
    {
      method: 'GET',
    }
  )

  if (response.status === 200) {
    return (await response.json()) as UniversityWithSchools
  }

  if (response.status === 404) {
    throw new Error('Not found')
  }

  throw new Error('Internal Server Error')
}

export async function getSchool(
  universityId: string,
  schoolId: string
): Promise<SchoolWithDegree> {
  if (universityId.length === 0) throw new Error('University ID Is Required')
  if (schoolId.length === 0) throw new Error('School ID Is Required')

  const data = await fetch(
    `${FRONTEND_URL}/api/universities/${universityId}/${schoolId}`,
    { method: 'GET' }
  )

  if (data.status === 200) {
    return (await data.json()) as SchoolWithDegree
  }

  if (data.status === 404) {
    throw new Error('Not found')
  }

  throw new Error('Internal Server Error')
}

export async function getDegree(
  universityId: string,
  schoolId: string,
  degreeId: string,
  year = 1
): Promise<DegreeWithDocuments> {
  if (universityId.length === 0) throw new Error('University ID Is Required')
  if (schoolId.length === 0) throw new Error('School ID Is Required')
  if (degreeId.length === 0) throw new Error('Degree ID Is Required')
  const data = await fetch(
    `${FRONTEND_URL}/api/universities/${universityId}/${schoolId}/${degreeId}?` +
      new URLSearchParams({
        year: year.toString(),
      }).toString(),
    { method: 'GET' }
  )

  if (data.status === 200) {
    return (await data.json()) as DegreeWithDocuments
  }

  if (data.status === 404) {
    throw new Error('Not found')
  }

  throw new Error('Internal Server Error')
}

export async function getSubject(
  subjectId: string,
  limit = 5,
  startAfter?: string
): Promise<SubjectWithDocumentsAndUniveristy> {
  if (subjectId.length === 0) throw new Error('Subject Id is required')

  const data = await fetch(
    `${FRONTEND_URL}/api/subject/${subjectId}?${new URLSearchParams({
      limit: limit.toString(),
      startAfter: startAfter ?? '',
    }).toString()}`,
    {
      method: 'GET',
    }
  )

  if (data.status === 200) {
    return (await data.json()) as SubjectWithDocumentsAndUniveristy
  }

  if (data.status === 404) {
    throw new Error('Not found')
  }

  throw new Error('Internal Server Error')
}

export async function getDocument(
  subjectId: string,
  docId: string
): Promise<FullDocumentInfo> {
  if (subjectId.length === 0) throw new Error('Subject Id is required')
  if (docId.length === 0) throw new Error('Doc Id is required')

  const data = await fetch(
    `${FRONTEND_URL}/api/subject/${subjectId}/${docId}`,
    { method: 'GET' }
  )

  if (data.status === 200) {
    return (await data.json()) as FullDocumentInfo
  }

  if (data.status === 404) {
    throw new Error('Not found')
  }

  throw new Error('Internal Server Error')
}

// TODO
export async function completeProfile(
  completeProfileData: CompleteProfileData
): Promise<void> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/completeprofile`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(completeProfileData),
  })

  if (res.status === 201) {
    try {
      logEvent('complete_profile')
      window.ttq.track('CompleteRegistration')
      window.fbq.track('CompleteRegistration')
    } catch {}
    return
  }

  throw new Error('Internal server error')
}

export async function uploadFile(docData: UploadData): Promise<string> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  // TODO: handle errors
  const res = await fetch(`${FRONTEND_URL}/api/upload`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(docData),
  })

  if (res.status !== 201) {
    throw new Error('Internal server error')
  }
  try {
    logEvent('upload_document')
  } catch {}
  return await res.json()
}

export async function completeKYC(completeKYCData: CompleteKYC): Promise<void> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/kyc`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(completeKYCData),
  })

  if (res.status === 200) {
    try {
      logEvent('request_kyc')
    } catch {}
    return
  }

  throw new Error('error')
}

export async function createCardRegistration(): Promise<CreateCardRegistration> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/createcardregistration`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })

  if (res.status !== 200) throw new Error('Internal server error')

  return (await res.json()) as CreateCardRegistration
}

export async function completeCardRegistration(
  id: string,
  registrationData: string
): Promise<void> {
  if (id.length === 0) throw new Error('id-required')
  if (registrationData.length === 0)
    throw new Error('registrationData-required')

  const res = await fetch(`${FRONTEND_URL}/api/completecardregistration`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      registrationData,
    }),
  })

  if (res.status !== 200) throw new Error('Internal server error')
}

export async function getCards(): Promise<card.CardData[]> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/getcards`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  if (res.status === 200) {
    return (await res.json()) as card.CardData[]
  }

  throw new Error('Internal server error')
}

export async function buy(data: BuyParams): Promise<BuyResponse> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/buy`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      cardId: data.cardId,
      products: data.productsPaths,
      screenHeight: screen.height,
      screenWidth: screen.width,
      colorDepth: screen.colorDepth,
      language: navigator.language,
      javaEnabled: navigator.javaEnabled(),
      timezoneOffset: new Date().getTimezoneOffset(),
      userAgent: navigator.userAgent,
      acceptHeader: data.headers.accept,
    }),
  })

  if (res.status === 200) return await res.json()
  if (res.status === 400) throw new Error('bad-request')
  throw new Error('error')
}

export async function getTransaction(user, transactionId) {
  const accessToken = await getIdToken()

  const res = await fetch(`${FRONTEND_URL}/api/transaction/${transactionId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  if (res.status === 200) return await res.json()

  if (res.status === 404) throw new Error('Not found')
  throw new Error('Internal server error')
}

export async function getDownloadUrl(user, subjectId, docId) {
  const accessToken = await getIdToken()

  const res = await fetch(
    `${FRONTEND_URL}/api/getdownloadurl/${subjectId}/${docId}`,
    { method: 'GET', headers: { authorization: `Bearer ${accessToken}` } }
  )

  if (res.status === 200) {
    try {
      logEvent('download_document', { document: subjectId + '/' + docId })
    } catch {}
    return res.json()
  }
  throw new Error('Internal server error')
}

export async function getUser(userId) {
  if (!userId) throw new Error('UserId is required')

  const res = await fetch(`${FRONTEND_URL}/api/user/${userId}`, {
    method: 'GET',
  })

  if (res.status === 200) return res.json()
  throw new Error('Internal server error')
}

export async function getBalance(): Promise<number> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/getbalance`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  })

  if (res.status === 200) {
    const { balance } = await res.json()
    return balance
  }
  throw new Error('error')
}

export async function updateBankAccount(
  iban: string
): Promise<bankAccount.IBANData> {
  if (iban.length === 0) throw new Error('Iban is required')

  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/updatebankaccount`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ iban }),
  })

  if (res.status === 200) {
    try {
      logEvent('update_bank_account')
    } catch {}
    return await res.json()
  }

  if (res.status === 400) throw new Error('Bad Request')
  throw new Error('Internal server errror')
}

export async function getBankAccount(): Promise<bankAccount.Data | null> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/getbankaccount`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  if (res.status === 200) {
    return (await res.json()) as bankAccount.Data
  }

  if (res.status === 404) {
    return null
  }

  throw new Error('error')
}

export async function payout(): Promise<void> {
  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/payout`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  if (res.status === 200) {
    try {
      logEvent('request_payout')
    } catch {}
    return
  }

  throw new Error('Internal server error')
}

export async function deleteCard(cardId: string): Promise<void> {
  if (cardId.length === 0) throw new Error('CardId is required')

  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/deletecard`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ cardId }),
  })

  if (res.status === 200) return
  throw new Error('internal-server-error')
}

export async function sendResetPasswordEmail(email: string): Promise<void> {
  const res = await fetch(`${FRONTEND_URL}/api/resetpassword`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  })

  if (res.status === 200) return
  throw new Error('error')
}

export async function addReferral(ref: string): Promise<void> {
  if (ref.length === 0) throw new Error('Ref is required')

  const accessToken = await getIdToken()
  if (accessToken == null) throw new Error('Unauthenticated')

  const res = await fetch(`${FRONTEND_URL}/api/addreferral`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ ref }),
  })

  if (res.status === 200 || res.status === 201) return
  throw new Error('error')
}

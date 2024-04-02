import { prisma } from 'prisma'
import {
  firestoreAdminProd,
  storageAdminProd,
  storageAdminNewProd,
} from './firebaseProd'
import fs from 'fs'
import mangopay from './mangopay'
import { createOrUpdateContact } from './brevo'
import { v4 as uuidv4 } from 'uuid'
import { makePdfDocument, makePdfPreview } from './processPdf'

const addUniversities = async () => {
  const databases = fs.readdirSync('./databases')

  const indexedSubjects: Record<string, any> = {}

  console.log('[#] Adding universities...')

  for (const database of databases) {
    const data = JSON.parse(
      fs.readFileSync(`./databases/${database}`).toString()
    )

    console.log('[+] University:', data.name)

    const logoBuffer = fs.readFileSync(`./logos/${data.symbol}.webp`)

    const university = await prisma.university.create({
      data: {
        logoUrl: '',
        name: data.name,
        symbol: data.symbol,
        url: data.url,
      },
    })

    const universityLogoRef = storageAdminNewProd.file(
      `university_logo/${university.id}.webp`
    )

    const logoUrl = universityLogoRef.publicUrl()

    await universityLogoRef
      .save(logoBuffer)
      .then(async () => await universityLogoRef.makePublic())

    await prisma.university.update({
      where: { id: university.id },
      data: { logoUrl },
    })

    for (const school of Object.keys(data.schools)) {
      console.log('\t[+] School:', school)
      const degrees = data.schools[school]
      const prismaSchool = await prisma.school.create({
        data: {
          name: school,
          universityId: university.id,
        },
      })

      for (const degree of Object.keys(degrees)) {
        const subjects = degrees[degree]

        const prismaDegree = await prisma.degree.create({
          data: {
            name: degree,
            schoolId: prismaSchool.id,
          },
        })

        for (const subject of Object.keys(subjects)) {
          const subjectData = subjects[subject]

          const prismaSubject =
            (subjectData.code as string).length > 0 &&
            indexedSubjects[`${university.id}-${subjectData.code}` as string] !=
              null
              ? indexedSubjects[
                  `${university.id}-${subjectData.code}` as string
                ]
              : await prisma.subject.create({
                  data: {
                    name: subject,
                    code: subjectData.code,
                    universityId: university.id,
                  },
                })

          await prisma.subjectWithYear.create({
            data: {
              year: subjectData.year as number,
              subjectId: prismaSubject.id,
              degreeId: prismaDegree.id,
            },
          })

          indexedSubjects[`${university.id}-${subjectData.code}` as string] =
            prismaSubject
        }
      }
    }
  }
}

const migrateUsers = async () => {
  const users = await firestoreAdminProd.collection('users').get()

  for (const user of users.docs) {
    const userData = user.data()
    const username = userData.username ?? (await generateUsername())

    if (userData.mangopayClientId == null) {
      await prisma.user.create({
        data: {
          uid: userData.uid,
          username: username,
          createdAt: new Date(userData.createdAt._seconds * 1000),
          ip: userData.ipAddress,
          biography: userData.biography,
        },
      })
      console.log(`[+] User ${userData.uid} migrated successfully`)
      continue
    }

    const mangopayUser = await mangopay.Users.get(userData.mangopayClientId)

    if (mangopayUser.PersonType !== 'NATURAL') {
      await prisma.user.create({
        data: {
          uid: userData.uid,
          username: username,
          createdAt: new Date(userData.createdAt._seconds * 1000),
          ip: userData.ipAddress,
          biography: userData.biography,
        },
      })
      console.log(
        `[-] Skipping user ${userData.uid} because it is not a natural person`
      )
      continue
    }

    if (mangopayUser.UserCategory !== 'OWNER') {
      await prisma.user.create({
        data: {
          uid: userData.uid,
          username: username,
          createdAt: new Date(userData.createdAt._seconds * 1000),
          ip: userData.ipAddress,
          biography: userData.biography,
        },
      })
      console.log(
        `[-] Skipping user ${userData.uid} because it is not an owner`
      )
      continue
    }

    if (typeof mangopayUser.Address == 'string') {
      await prisma.user.create({
        data: {
          uid: userData.uid,
          username: username,
          createdAt: new Date(userData.createdAt._seconds * 1000),
          ip: userData.ipAddress,
          biography: userData.biography,
        },
      })
      console.log(`[-] Skipping user ${userData.uid} because it has no address`)
      continue
    }

    const mangopayWallet = await mangopay.Wallets.get(userData.mangopayWalletId)

    const { id: brevoId } = await createOrUpdateContact(
      userData.email as string,
      {
        USERNAME: username,
        SIGNUP_DATE: new Date(userData.createdAt._seconds * 1000)
          .toISOString()
          .split('T')[0],
      }
    )

    await prisma.user.create({
      data: {
        uid: userData.uid,
        username: username,
        createdAt: new Date(userData.createdAt._seconds * 1000),
        ip: userData.ipAddress,
        biography: userData.biography,
        countryOfResidence: mangopayUser.CountryOfResidence,
        birthDate: new Date(mangopayUser.Birthday * 1000),
        canBuy: true,
        canUpload: true,
        firstName: mangopayUser.FirstName,
        lastName: mangopayUser.LastName,
        nationality: mangopayUser.Nationality,
        brevoId: String(brevoId),
        billing: {
          create: {
            firstName: mangopayUser.FirstName,
            lastName: mangopayUser.LastName,
            address1: mangopayUser.Address.AddressLine1,
            address2: mangopayUser.Address.AddressLine2,
            city: mangopayUser.Address.City,
            country: mangopayUser.Address.Country,
            postalCode: mangopayUser.Address.PostalCode,
            region: mangopayUser.Address.Region,
          },
        },
        mangopayUser: {
          create: {
            mangopayId: mangopayUser.Id,
            kycLevel: mangopayUser.KYCLevel,
            userType: mangopayUser.UserCategory,
            walletId: mangopayWallet.Id,
          },
        },
      },
    })

    console.log(`[+] User ${userData.uid} migrated successfully`)
  }
}

export const generateUsername = async (): Promise<string> => {
  const allowedCharacter =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let username = 'user_'
  for (let i = 0; i < 6; i++) {
    const caracterAleatorio =
      allowedCharacter[Math.floor(Math.random() * allowedCharacter.length)]
    username += caracterAleatorio
  }

  return username
  // if (await isUsernameAvailable(username)) return username
  // return await generateUsername()
}

const main = async () => {
  // Reset database
  await Promise.all([
    await prisma.billing.deleteMany(),
    await prisma.subjectWithYear.deleteMany(),
    await prisma.degree.deleteMany(),
    await prisma.review.deleteMany(),
    await prisma.document.deleteMany(),
    await prisma.documentTransaction.deleteMany(),
    await prisma.documentType.deleteMany(),
    await prisma.mangopayUser.deleteMany(),
    await prisma.school.deleteMany(),
    await prisma.subject.deleteMany(),
    await prisma.transaction.deleteMany(),
    await prisma.university.deleteMany(),
    await prisma.user.deleteMany(),
  ])

  await prisma.documentType.createMany({
    data: [
      { name: 'exam' },
      { name: 'note' },
      { name: 'practice' },
      { name: 'assignment' },
      { name: 'exercise' },
      { name: 'summary' },
      { name: 'presentation' },
      { name: 'other' },
    ],
  })

  const documentType = await prisma.documentType.findFirst({
    where: {
      name: 'note',
    },
  })

  if (documentType == null) {
    console.log('[!] Error fetching document type')
    return
  }

  await addUniversities()
  await migrateUsers()

  const docs = await firestoreAdminProd.collectionGroup('docs').get()

  const firestoreSubjects: Record<string, any> = {}
  const firestoreUniversities: Record<string, any> = {}

  for (const doc of docs.docs) {
    const docData = doc.data()
    console.log(`[+] Migrating document ${docData.name}`)
    const subjectId = doc.ref.path.split('/')[1]

    const firestoreSubjectData =
      firestoreSubjects[subjectId] ??
      (await firestoreAdminProd.doc(`subjects/${subjectId}`).get()).data()

    firestoreSubjects[subjectId] = firestoreSubjectData

    const firestoreUniversityData =
      firestoreUniversities[firestoreSubjectData.university] ??
      (
        await firestoreAdminProd
          .doc(`universities/${firestoreSubjectData.university}`)
          .get()
      ).data()

    firestoreUniversities[firestoreSubjectData.university] =
      firestoreUniversityData

    const subject = await prisma.subject.findFirst({
      where: {
        code: firestoreSubjectData.code,
        university: {
          symbol: firestoreUniversityData.symbol,
        },
      },
      select: {
        name: true,
        id: true,
        university: {
          select: {
            name: true,
          },
        },
      },
    })

    const userData = await prisma.user.findUnique({
      where: {
        uid: docData.createdBy,
      },
      select: {
        id: true,
        username: true,
      },
    })

    if (subject == null || userData == null) {
      console.log('[!] Error fetching subject or user')
      continue
    }

    const documentIdentifier = uuidv4()
    const extension = docData.fileName.split('.').at(-1)

    const originalRawFileRef = storageAdminProd.file(docData.file)
    const [originalFileBuffer] = await originalRawFileRef.download()
    const originalFileBase64 = originalFileBuffer.toString('base64')

    const originalFilePath = `documents/${documentIdentifier}/original.${extension}`

    const originalFileRef = storageAdminNewProd.file(originalFilePath)
    const fileStream = originalFileRef.createWriteStream({
      metadata: {
        contentType: docData.contentType,
      },
    })

    try {
      await new Promise((resolve, reject) => {
        fileStream.on('finish', resolve)
        fileStream.on('error', reject)
        fileStream.end(originalFileBuffer)
      })
    } catch {
      console.log('[!] Error uploading file')
      continue
    }

    const getPreivewPath = async (): Promise<string | null> => {
      if (docData.contentType !== 'application/pdf') return null

      const preivewPath = `documents/${documentIdentifier}/preview.pdf`
      const preview = await makePdfPreview({
        base64pdf: originalFileBase64,
        title: docData.name,
        author: userData.username,
        subject: subject.name,
        university: subject.university.name,
      })

      const preivewRef = storageAdminNewProd.file(preivewPath)
      const previewStream = preivewRef.createWriteStream({
        metadata: {
          contentType: 'application/pdf',
        },
      })

      await new Promise((resolve, reject) => {
        previewStream.on('finish', resolve)
        previewStream.on('error', reject)
        previewStream.end(Buffer.from(preview))
      })

      await preivewRef.makePublic()
      const previewUrl = preivewRef.publicUrl()

      return previewUrl
    }

    const previewUrl = await getPreivewPath()

    const document = await prisma.document.create({
      data: {
        title: docData.name,
        description: docData.description,
        byHand: false,
        price: docData.price,
        contentType: docData.contentType,
        originalFilePath,
        // filePath,
        previewPdfUrl: previewUrl,
        extension: extension,

        documentType: {
          connect: {
            id: documentType.id,
          },
        },
        subject: {
          connect: {
            id: subject.id,
          },
        },
        user: {
          connect: {
            id: userData.id,
          },
        },
      },
      include: {
        subject: {
          include: {
            university: true,
          },
        },
      },
    })

    if (docData.contentType !== 'application/pdf') continue

    // Improve PDF
    const enhancedPdf = await makePdfDocument({
      base64pdf: originalFileBase64,
      title: docData.name,
      author: userData.username,
      subject: subject.name,
      university: subject.university.name,
      url: `https://inothy.com/document/${document.id}`,
    })

    const enhancedFilePath = `documents/${documentIdentifier}/document.${extension}`

    const enhancedFileRef = storageAdminNewProd.file(enhancedFilePath)

    const enhancedPDFStream = enhancedFileRef.createWriteStream({
      metadata: {
        contentType: docData.contentType,
      },
    })

    try {
      await new Promise((resolve, reject) => {
        enhancedPDFStream.on('finish', resolve)
        enhancedPDFStream.on('error', reject)
        enhancedPDFStream.end(Buffer.from(enhancedPdf))
      })
    } catch {}

    await prisma.document.update({
      where: {
        id: document.id,
      },
      data: {
        enhancedFilePath,
      },
    })
  }
}

main()

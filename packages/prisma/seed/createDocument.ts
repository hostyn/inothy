import { storageAdmin } from 'firebase-admin-config'
import fs from 'fs'
import { type Document, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

interface CrateDocument {
  filePath: string
  previewPdfUrl: string
  userId: string
  documentTypeId: string
  subjectId: string
}

export default async function createDocument({
  filePath,
  previewPdfUrl,
  userId,
  documentTypeId,
  subjectId,
}: CrateDocument): Promise<Document> {
  return await prisma.document.create({
    data: {
      byHand: faker.datatype.boolean(),
      contentType: 'application/pdf',
      title: faker.lorem.sentence({ min: 10, max: 30 }),
      description: faker.lorem.paragraphs({ max: 5, min: 2 }),
      filePath,
      previewPdfUrl,
      price: parseFloat(faker.finance.amount(2, 10.99, 2)),
      calification: parseFloat(faker.finance.amount(0, 10, 1)),
      professor: faker.person.fullName(),
      year: faker.date.past({ years: 5 }).getFullYear(),
      user: {
        connect: {
          id: userId,
        },
      },
      subject: {
        connect: {
          id: subjectId,
        },
      },
      documentType: {
        connect: {
          id: documentTypeId,
        },
      },
    },
  })
}

export const uploadDocument = async (): Promise<{
  filePath: string
  previewPdfUrl: string
}> => {
  const documentIdentifier = '1ffe84b5-67ef-4bc2-9b3f-74635bdc73e3'
  const filePath = `documents/${documentIdentifier}/document.pdf`

  const fileRef = storageAdmin.file(filePath)
  const fileStream = fileRef.createWriteStream({
    metadata: {
      contentType: 'application/pdf',
    },
  })

  const document = fs.readFileSync('resources/document.pdf')

  try {
    await new Promise((resolve, reject) => {
      fileStream.on('finish', resolve)
      fileStream.on('error', reject)
      fileStream.end(document)
    })
  } catch {}

  const previewPath = `documents/${documentIdentifier}/document.pdf`

  const preivewRef = storageAdmin.file(previewPath)
  const preivewStream = preivewRef.createWriteStream({
    metadata: {
      contentType: 'application/pdf',
    },
  })

  const preivew = fs.readFileSync('resources/preview.pdf')

  try {
    await new Promise((resolve, reject) => {
      preivewStream.on('finish', resolve)
      preivewStream.on('error', reject)
      preivewStream.end(preivew)
    })

    await preivewRef.makePublic()
  } catch {}

  return { filePath, previewPdfUrl: preivewRef.publicUrl() }
}

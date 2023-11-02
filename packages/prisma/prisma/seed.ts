import { PrismaClient } from '@prisma/client'
import { authAdmin, storageAdmin } from 'firebase-admin-config'
import universities from '../resources/universities.json'
import subjects from '../resources/subjects.json'
import schools from '../resources/schools.json'
import degrees from '../resources/degrees.json'
import subjectsWithYear from '../resources/subjectsWithYear.json'
import fs from 'fs'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await storageAdmin.deleteFiles({
    prefix: 'documents/',
  })

  await Promise.all(
    universities.map(async university => {
      const logoBuffer = fs.readFileSync(`resources/${university.symbol}.png`)

      const universityLogoRef = storageAdmin.file(
        `university_logo/${university.id}.png`
      )

      const logoUrl = universityLogoRef.publicUrl()

      void universityLogoRef
        .save(logoBuffer)
        .then(async () => await universityLogoRef.makePublic())

      await prisma.university.create({
        data: {
          id: university.id,
          name: university.name,
          symbol: university.symbol,
          logoUrl,
          url: university.url,
        },
      })
    })
  )

  await prisma.school.createMany({ data: schools })
  await prisma.degree.createMany({ data: degrees })
  await prisma.subjectWithYear.createMany({ data: subjectsWithYear })
  await prisma.subject.createMany({ data: subjects })

  const users = await authAdmin.listUsers()
  await authAdmin.deleteUsers(users.users.map(user => user.uid))

  const user = await authAdmin.createUser({
    email: 'test@test.com',
    password: 'test1234',
    emailVerified: true,
  })

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

  await new Promise(resolve => setTimeout(resolve, 1000))

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

  const examDocumentType = await prisma.documentType.findFirst({
    where: {
      name: 'exam',
    },
  })

  await prisma.document.create({
    data: {
      byHand: false,
      contentType: 'application/pdf',
      title: 'test',
      description: 'test',
      filePath: 'documents/test.pdf',
      previewUrl: preivewRef.publicUrl(),
      price: 2.3,
      user: {
        create: {
          uid: user.uid,
          username: 'test',
        },
      },
      subject: {
        connect: {
          id: '649a010baa817f497301be99',
        },
      },
      documentType: {
        connect: {
          id: examDocumentType?.id,
        },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

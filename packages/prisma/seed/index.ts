import { PrismaClient } from '@prisma/client'
import createUser from './createUser'
import resetData from './resetData'
import createDocument, { uploadDocument } from './createDocument'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const subjectIds = [
  '649a010b16113af179c66980',
  '649a010b025acd163d13ef7e',
  '649a010b07b9a14db76389c3',
  '649a010b69e22720c1fba506',
  '649a010b4a96a7a8407cbcc0',
  '649a010b002c17c798349649',
  '649a010b002a89e5fbb6c835',
  '649a010b008b531918495e99',
]

async function main(): Promise<void> {
  await resetData()

  const documentTypes = await prisma.documentType.findMany()

  const mainUser = await createUser({
    username: 'test',
    email: 'test@test.com',
  })

  const dummyUsers = await Promise.all(
    Array.from(Array(10)).map(async () => await createUser())
  )

  const { filePath, previewPdfUrl } = await uploadDocument()

  const documents = await Promise.all(
    Array.from(Array(30)).map(
      async () =>
        await createDocument({
          filePath,
          previewPdfUrl,
          subjectId:
            subjectIds[
              faker.number.int({ min: 0, max: subjectIds.length - 1 })
            ],
          userId: mainUser.id,
          documentTypeId:
            documentTypes[
              faker.number.int({ min: 0, max: documentTypes.length - 1 })
            ].id,
        })
    )
  )

  await Promise.all(
    documents.map(async document => {
      await Promise.all(
        dummyUsers.map(
          async user =>
            await prisma.review.create({
              data: {
                userId: user.id,
                comment: faker.lorem.paragraphs({ max: 5, min: 2 }),
                rating: faker.number.int({ min: 0, max: 5 }),
                documentId: document.id,
              },
            })
        )
      )
    })
  )
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

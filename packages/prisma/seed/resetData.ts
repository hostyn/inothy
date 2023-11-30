import universities from '../resources/universities.json'
import subjects from '../resources/subjects.json'
import schools from '../resources/schools.json'
import degrees from '../resources/degrees.json'
import subjectsWithYear from '../resources/subjectsWithYear.json'
import fs from 'fs'
import { authAdmin, storageAdmin } from 'firebase-admin-config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function resetData(): Promise<void> {
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
}

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const salt = bcrypt.genSaltSync();
  const encryptedPassword = bcrypt.hashSync("testtest", salt);

  await prisma.user.create({
    data: { email: "test@test.com", password: encryptedPassword },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

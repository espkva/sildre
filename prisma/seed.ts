import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const users = [
    "Familien Knutsen",
    "Pappa Trond",
    "Mamma Toril",
    "Theodor Jr.",
    "Elise Jr.",
  ];

  users.forEach(async (user) => {
    await prisma.user.create({
      data: {
        name: user,
      },
    });
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

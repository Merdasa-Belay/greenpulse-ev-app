const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const DEFAULT_ADMIN = {
  name: "admin",
  email: "admin@local",
  password: "admin",
};

async function main() {
  const prisma = new PrismaClient();
  const existing = await prisma.user.findFirst({ where: { role: "admin" } });
  if (existing) {
    await prisma.$disconnect();
    return;
  }

  const password = await bcrypt.hash(DEFAULT_ADMIN.password, 12);
  await prisma.user.create({
    data: {
      name: DEFAULT_ADMIN.name,
      email: DEFAULT_ADMIN.email,
      password,
      role: "admin",
    },
  });

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/jwt";

export const DEFAULT_ADMIN = {
  name: "admin",
  email: "admin@local",
  password: "admin",
};

export async function ensureDefaultAdmin() {
  const existing = await prisma.user.findFirst({ where: { role: "admin" } });
  if (existing) {
    return existing;
  }

  const passwordHash = await hashPassword(DEFAULT_ADMIN.password);
  return prisma.user.create({
    data: {
      name: DEFAULT_ADMIN.name,
      email: DEFAULT_ADMIN.email,
      password: passwordHash,
      role: "admin",
    },
  });
}

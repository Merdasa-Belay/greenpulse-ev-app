import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/lib/jwt";
import { adminLoginSchema } from "@/lib/validators/admin";
import { getAdminCookieName, signAdminToken } from "@/lib/adminAuth";
import { DEFAULT_ADMIN, ensureDefaultAdmin } from "@/lib/adminSeed";

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Database not configured." }, { status: 500 });
  }
  const body = await request.json();
  const parsed = adminLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  }

  const { username, password } = parsed.data;

  let user = await prisma.user.findFirst({
    where: {
      role: "admin",
      OR: [{ name: username }, { email: username }],
    },
  });

  const isDefaultLogin = username === DEFAULT_ADMIN.name || username === DEFAULT_ADMIN.email;

  if (!user && isDefaultLogin) {
    user = await ensureDefaultAdmin();
  }

  if (!user && isDefaultLogin) {
    const existingAdmin = await prisma.user.findFirst({ where: { role: "admin" } });
    if (existingAdmin) {
      const passwordHash = await hashPassword(DEFAULT_ADMIN.password);
      user = await prisma.user.update({
        where: { id: existingAdmin.id },
        data: {
          name: DEFAULT_ADMIN.name,
          email: DEFAULT_ADMIN.email,
          password: passwordHash,
        },
      });
    }
  }

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  let passwordValid = await comparePassword(password, user.password);
  if (!passwordValid) {
    const isDefaultAdmin = user.name === DEFAULT_ADMIN.name && password === DEFAULT_ADMIN.password;
    if (isDefaultAdmin) {
      const passwordHash = await hashPassword(DEFAULT_ADMIN.password);
      await prisma.user.update({ where: { id: user.id }, data: { password: passwordHash } });
      passwordValid = true;
    }
  }

  if (!passwordValid) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = await signAdminToken({
    userId: user.id,
    role: "admin",
    email: user.email,
    name: user.name,
  });

  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });

  response.cookies.set(getAdminCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
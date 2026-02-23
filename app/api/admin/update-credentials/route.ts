import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/adminServer";
import { hashPassword, comparePassword } from "@/lib/jwt";

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Database not configured." }, { status: 500 });
  }

  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const { username, currentPassword, newPassword } = body ?? {};

  if (!username && !newPassword) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  if (!currentPassword) {
    return NextResponse.json({ error: "Current password is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: admin.userId } });
  if (!user) {
    return NextResponse.json({ error: "Admin not found." }, { status: 404 });
  }

  const valid = await comparePassword(currentPassword, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid current password." }, { status: 401 });
  }

  const data: { name?: string; password?: string } = {};
  if (username) data.name = username;
  if (newPassword) data.password = await hashPassword(newPassword);

  const updated = await prisma.user.update({
    where: { id: user.id },
    data,
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json({ user: updated });
}
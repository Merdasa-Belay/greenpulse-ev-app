import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/validators/blog";
import { slugify } from "@/lib/blogUtils";
import { getAdminFromCookies } from "@/lib/adminServer";

export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const slug = slugify(parsed.data.name);
  const category = await prisma.category.create({
    data: { name: parsed.data.name, slug },
  });

  return NextResponse.json({ category }, { status: 201 });
}

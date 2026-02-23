import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { postCreateSchema } from "@/lib/validators/blog";
import { calculateReadTime, slugify } from "@/lib/blogUtils";
import { getAdminFromCookies } from "@/lib/adminServer";

export async function GET(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";
  const status = searchParams.get("status") || "all";
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  const where: Record<string, unknown> = {};
  if (status === "draft" || status === "published") {
    where.status = status;
  }
  if (query) {
    where.OR = [
      { title: { contains: query } },
      { excerpt: { contains: query } },
    ];
  }

  const [total, posts] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { category: true, tags: { include: { tag: true } } },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return NextResponse.json({
    posts,
    pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
  });
}

export async function POST(request: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = postCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { title, excerpt, content, coverImage, categoryId, tags, status, seoTitle, seoDescription } = parsed.data;
  const slugBase = slugify(title);
  let slug = slugBase;
  let counter = 2;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${counter}`;
    counter += 1;
  }

  const readTime = calculateReadTime(content);
  const publishedAt = status === "published" ? new Date() : null;

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage: coverImage || null,
      status,
      readTime,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      publishedAt,
      authorId: admin.userId,
      categoryId: categoryId ?? null,
      tags: tags?.length
        ? {
            create: tags.map((tagSlug) => ({
              tag: {
                connectOrCreate: {
                  where: { slug: tagSlug },
                  create: { slug: tagSlug, name: tagSlug.replace(/-/g, " ") },
                },
              },
            })),
          }
        : undefined,
    },
    include: { category: true, tags: { include: { tag: true } } },
  });

  return NextResponse.json({ post }, { status: 201 });
}

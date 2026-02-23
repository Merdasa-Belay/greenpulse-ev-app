import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { postUpdateSchema } from "@/lib/validators/blog";
import { calculateReadTime, slugify } from "@/lib/blogUtils";
import { getAdminFromCookies } from "@/lib/adminServer";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolved = await params;
  const postId = Number(resolved.id);
  if (!postId) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { category: true, tags: { include: { tag: true } } },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolved = await params;
  const postId = Number(resolved.id);
  if (!postId) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  const body = await request.json();
  const parsed = postUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const data = parsed.data;
  let slug: string | undefined;
  if (data.title) {
    const baseSlug = slugify(data.title);
    slug = baseSlug;
    let counter = 2;
    while (await prisma.post.findFirst({ where: { slug, id: { not: postId } } })) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }
  }

  const readTime = data.content ? calculateReadTime(data.content) : undefined;
  const publishedAt = data.status === "published" ? new Date() : undefined;

  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage === "" ? null : data.coverImage,
      status: data.status,
      readTime,
      seoTitle: data.seoTitle === "" ? null : data.seoTitle,
      seoDescription: data.seoDescription === "" ? null : data.seoDescription,
      publishedAt,
      categoryId: data.categoryId ?? undefined,
      tags: data.tags
        ? {
            deleteMany: {},
            create: data.tags.map((tagSlug) => ({
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

  return NextResponse.json({ post });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolved = await params;
  const postId = Number(resolved.id);
  if (!postId) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  await prisma.post.delete({ where: { id: postId } });
  return NextResponse.json({ success: true });
}

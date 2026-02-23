import prisma from "@/lib/prisma";

const dbErrorCodes = new Set(["P1000", "P1001", "P2021", "P2022", "P6001"]);

export async function getPublishedPosts(limit?: number) {
  if (!process.env.DATABASE_URL) {
    return [];
  }
  try {
    return await prisma.post.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: limit,
      include: { category: true, author: true, tags: { include: { tag: true } } },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      dbErrorCodes.has((error as { code?: string }).code ?? "")
    ) {
      return [];
    }
    throw error;
  }
}

export async function getPostBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  try {
    return await prisma.post.findFirst({
      where: { slug, status: "published" },
      include: { category: true, author: true, tags: { include: { tag: true } } },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      dbErrorCodes.has((error as { code?: string }).code ?? "")
    ) {
      return null;
    }
    throw error;
  }
}

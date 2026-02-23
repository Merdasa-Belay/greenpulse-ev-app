import { z } from "zod";

export const postStatusSchema = z.enum(["draft", "published"]);

export const postCreateSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  coverImage: z.string().url().optional().or(z.literal("")),
  categoryId: z.number().int().optional().nullable(),
  tags: z.array(z.string().min(1)).optional(),
  status: postStatusSchema.default("draft"),
  seoTitle: z.string().max(120).optional().or(z.literal("")),
  seoDescription: z.string().max(160).optional().or(z.literal("")),
});

export const postUpdateSchema = postCreateSchema.partial().extend({
  status: postStatusSchema.optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2),
});

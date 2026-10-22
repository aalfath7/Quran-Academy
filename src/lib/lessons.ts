import { and, asc, desc, eq, ne } from "drizzle-orm";
import { z } from "zod";
import type { createDb } from "@/db/connection";
import { lessons } from "@/db/schema";
import { lessonCategories, type LessonCategory } from "./categories";

type Db = ReturnType<typeof createDb>;

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const optionalText = z
  .string()
  .trim()
  .transform((value) => value || null);

export const lessonInputSchema = z
  .object({
    title: z.string().trim().min(3, "Judul minimal 3 karakter.").max(120, "Judul maksimal 120 karakter."),
    slug: z.string().trim(),
    category: z.enum(lessonCategories, { error: "Pilih kategori." }),
    summary: z.string().trim().min(10, "Ringkasan minimal 10 karakter.").max(300, "Ringkasan maksimal 300 karakter."),
    arabicText: optionalText,
    content: z.string().trim().min(20, "Isi materi minimal 20 karakter."),
    position: z.coerce.number({ error: "Urutan harus berupa angka." }).int("Urutan harus bilangan bulat.").min(0).max(9999),
    published: z.boolean()
  })
  .transform((input) => ({ ...input, slug: slugify(input.slug || input.title) }))
  .refine((input) => input.slug.length > 0, { path: ["slug"], message: "Slug tidak valid." });

export type LessonInput = z.output<typeof lessonInputSchema>;

export function listPublishedLessons(db: Db, category?: LessonCategory) {
  return db
    .select()
    .from(lessons)
    .where(category ? and(eq(lessons.published, true), eq(lessons.category, category)) : eq(lessons.published, true))
    .orderBy(asc(lessons.category), asc(lessons.position), asc(lessons.createdAt));
}

export function listLatestLessons(db: Db, limit: number) {
  return db.select().from(lessons).where(eq(lessons.published, true)).orderBy(desc(lessons.createdAt)).limit(limit);
}

export async function getPublishedLesson(db: Db, slug: string) {
  const [lesson] = await db
    .select()
    .from(lessons)
    .where(and(eq(lessons.slug, slug), eq(lessons.published, true)))
    .limit(1);

  return lesson ?? null;
}

export function listAllLessons(db: Db) {
  return db.select().from(lessons).orderBy(asc(lessons.category), asc(lessons.position), asc(lessons.createdAt));
}

export async function getLesson(db: Db, id: string) {
  const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);

  return lesson ?? null;
}

export async function isSlugTaken(db: Db, slug: string, exceptId?: string) {
  const [row] = await db
    .select({ id: lessons.id })
    .from(lessons)
    .where(exceptId ? and(eq(lessons.slug, slug), ne(lessons.id, exceptId)) : eq(lessons.slug, slug))
    .limit(1);

  return Boolean(row);
}

export async function createLesson(db: Db, input: LessonInput) {
  const id = crypto.randomUUID();
  await db.insert(lessons).values({ id, ...input });

  return id;
}

export async function updateLesson(db: Db, id: string, input: LessonInput) {
  await db
    .update(lessons)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(lessons.id, id));
}

export async function deleteLesson(db: Db, id: string) {
  await db.delete(lessons).where(eq(lessons.id, id));
}

import { and, asc, desc, eq, inArray, ne, sql } from "drizzle-orm";
import { z } from "zod";
import type { createDb } from "@/db/connection";
import { lessons } from "@/db/schema";
import { lessonCategories, type LessonCategory } from "./categories";

type Db = ReturnType<typeof createDb>;

/** Sorts categories in the order of lessonCategories rather than alphabetically. */
const categoryOrder = sql`case ${lessons.category} ${sql.join(
  lessonCategories.map((category, index) => sql`when ${category} then ${index}`),
  sql` `
)} end`;

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

/** Published lessons of one category, of several, or of all when none is given. */
export function listPublishedLessons(db: Db, category?: LessonCategory | readonly LessonCategory[]) {
  const inCategory =
    category === undefined ? undefined : typeof category === "string" ? eq(lessons.category, category) : inArray(lessons.category, [...category]);

  return db
    .select()
    .from(lessons)
    .where(and(eq(lessons.published, true), inCategory))
    .orderBy(categoryOrder, asc(lessons.position), asc(lessons.createdAt));
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
  return db.select().from(lessons).orderBy(categoryOrder, asc(lessons.position), asc(lessons.createdAt));
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

/** Paragraphs of lesson content; one written only in Arabic script (a bait of a matan, an ayah) is flagged so the page can set it apart. */
export function contentBlocks(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text) => ({ text, arabic: !/[A-Za-z]/.test(text) && /[؀-ۿ]/.test(text) }));
}

/** Rows of a reading drill; within a row, two or more spaces separate groups that are read in one breath. */
export function drillRows(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/\s{2,}/));
}

/**
 * Practice content: text before the first drill is the guide, except the paragraph right before it,
 * which labels that drill like every later text paragraph labels the drill after it.
 */
export function practiceSections(content: string) {
  const blocks = contentBlocks(content);
  const firstDrill = blocks.findIndex(({ arabic }) => arabic);
  const guideEnd = firstDrill > 0 && !blocks[firstDrill - 1].arabic ? firstDrill - 1 : Math.max(firstDrill, 0);
  const guide = (firstDrill === -1 ? blocks : blocks.slice(0, guideEnd)).map(({ text }) => text);

  const sections: { label?: string; rows: string[][] }[] = [];
  let label: string | undefined;
  for (const block of firstDrill === -1 ? [] : blocks.slice(guideEnd)) {
    if (block.arabic) {
      sections.push({ label, rows: drillRows(block.text) });
      label = undefined;
    } else {
      if (label) sections.push({ label, rows: [] });
      label = block.text;
    }
  }
  if (label) sections.push({ label, rows: [] });

  return { guide, sections };
}

/** A practice label written as a sound key ("ba = بَ · bi = بِ · bu = بُ"), or null for an ordinary label. */
export function soundKey(label: string) {
  const entries = label.split(" · ").map((entry) => entry.split(" = ").map((part) => part.trim()));
  const isKey = entries.every(
    ([reading, ...forms]) =>
      forms.length > 0 && !/[؀-ۿ]/.test(reading) && forms.every((form) => /[؀-ۿ]/.test(form) && !/[A-Za-z]/.test(form))
  );

  return isKey ? entries.map(([reading, ...forms]) => ({ reading, forms })) : null;
}

/** How many drill sections a practice has, i.e. how many can be marked fluent. */
export function practiceDrillCount(content: string) {
  return practiceSections(content).sections.filter(({ rows }) => rows.length > 0).length;
}

import { and, asc, eq, inArray } from "drizzle-orm";
import type { createDb } from "@/db/connection";
import { ayahs, surahs } from "@/db/schema";

type Db = ReturnType<typeof createDb>;

export const SURAH_COUNT = 114;

/** Parses a route segment into a positive integer, or null for anything else ("01", "2a", "-1"). */
export function parsePositiveInt(value: string) {
  return /^[1-9]\d{0,3}$/.test(value) ? Number(value) : null;
}

const surahSummary = {
  number: surahs.number,
  nameArabic: surahs.nameArabic,
  nameLatin: surahs.nameLatin,
  transliteration: surahs.transliteration,
  translation: surahs.translation,
  ayahCount: surahs.ayahCount,
  location: surahs.location
};

export function listSurahs(db: Db) {
  return db.select(surahSummary).from(surahs).orderBy(asc(surahs.number));
}

export type SurahSummary = Awaited<ReturnType<typeof listSurahs>>[number];

/** Surahs commonly read on their own, in the order they are featured. */
export const featuredSurahNumbers = [1, 18, 36, 55, 56, 67];

/** The given surahs in the given order; numbers without a surah are skipped. */
export async function listSurahsByNumber(db: Db, numbers: number[]) {
  const rows = await db.select(surahSummary).from(surahs).where(inArray(surahs.number, numbers));

  return numbers.flatMap((number) => rows.find((row) => row.number === number) ?? []);
}

export async function getSurah(db: Db, number: number) {
  const [surah] = await db.select().from(surahs).where(eq(surahs.number, number)).limit(1);

  return surah ?? null;
}

/** Ayahs of one surah for reading; the long tafsir tahlili is left for the per-ayah page. */
export function listAyahs(db: Db, surahNumber: number) {
  return db
    .select({
      id: ayahs.id,
      number: ayahs.number,
      juz: ayahs.juz,
      page: ayahs.page,
      arabic: ayahs.arabic,
      latin: ayahs.latin,
      translation: ayahs.translation,
      footnotes: ayahs.footnotes,
      tafsirWajiz: ayahs.tafsirWajiz
    })
    .from(ayahs)
    .where(eq(ayahs.surahNumber, surahNumber))
    .orderBy(asc(ayahs.number));
}

export async function getAyah(db: Db, surahNumber: number, number: number) {
  const [ayah] = await db
    .select()
    .from(ayahs)
    .where(and(eq(ayahs.surahNumber, surahNumber), eq(ayahs.number, number)))
    .limit(1);

  return ayah ?? null;
}

/** The ayahs immediately before and after one ayah in mushaf order, crossing surah boundaries. */
export async function getNeighbourAyahs(db: Db, id: number) {
  const rows = await db
    .select({ id: ayahs.id, surahNumber: ayahs.surahNumber, number: ayahs.number, nameLatin: surahs.nameLatin })
    .from(ayahs)
    .innerJoin(surahs, eq(surahs.number, ayahs.surahNumber))
    .where(inArray(ayahs.id, [id - 1, id + 1]));

  return {
    previous: rows.find((row) => row.id === id - 1) ?? null,
    next: rows.find((row) => row.id === id + 1) ?? null
  };
}

/** Bismillah is printed before every surah except Al-Fatihah (where it is ayah 1) and At-Taubah. */
export function showsBismillah(surahNumber: number) {
  return surahNumber !== 1 && surahNumber !== 9;
}

export function paragraphs(text: string | null) {
  return (text ?? "")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

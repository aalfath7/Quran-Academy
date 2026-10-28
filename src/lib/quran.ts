import { and, asc, count, eq, inArray, min, sql } from "drizzle-orm";
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

/** The first ayah of every juz, ordered by juz. */
export function listJuzStarts(db: Db) {
  const firstAyahs = db.select({ id: min(ayahs.id) }).from(ayahs).groupBy(ayahs.juz);

  return db
    .select({ juz: ayahs.juz, surahNumber: ayahs.surahNumber, ayah: ayahs.number })
    .from(ayahs)
    .where(inArray(ayahs.id, firstAyahs))
    .orderBy(asc(ayahs.juz));
}

/** The first page of every juz, ordered by juz. */
export function listJuzPages(db: Db) {
  return db
    .select({ juz: ayahs.juz, page: min(ayahs.page).mapWith(Number) })
    .from(ayahs)
    .groupBy(ayahs.juz)
    .orderBy(asc(ayahs.juz));
}

/** The mushaf page every surah opens on, in surah order. */
export function listSurahPages(db: Db) {
  return db.select({ number: surahs.number, nameLatin: surahs.nameLatin, page: surahs.page }).from(surahs).orderBy(asc(surahs.number));
}

/** Every ayah printed on one mushaf page, in order, with the surah it belongs to. */
export function listPageAyahs(db: Db, page: number) {
  return db
    .select({
      id: ayahs.id,
      surahNumber: ayahs.surahNumber,
      number: ayahs.number,
      juz: ayahs.juz,
      arabic: ayahs.arabic,
      nameArabic: surahs.nameArabic,
      nameLatin: surahs.nameLatin,
      ayahCount: surahs.ayahCount,
      location: surahs.location
    })
    .from(ayahs)
    .innerJoin(surahs, eq(surahs.number, ayahs.surahNumber))
    .where(eq(ayahs.page, page))
    .orderBy(asc(ayahs.id));
}

export type PageAyah = Awaited<ReturnType<typeof listPageAyahs>>[number];

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

export const SEARCH_PAGE_SIZE = 20;

/**
 * Ayahs whose translation contains every term (case-insensitive), in mushaf order, one page at a time.
 * LIKE wildcards in the terms are escaped so "50%" or "a_b" match literally.
 */
export async function searchAyahs(db: Db, terms: string[], page = 1) {
  if (terms.length === 0) return { results: [], total: 0 };

  const where = and(
    ...terms.map((term) => sql`${ayahs.translation} like ${`%${term.replace(/[\\%_]/g, "\\$&")}%`} escape '\\'`)
  );
  const [results, [{ total }]] = await Promise.all([
    db
      .select({
        id: ayahs.id,
        surahNumber: ayahs.surahNumber,
        number: ayahs.number,
        nameLatin: surahs.nameLatin,
        arabic: ayahs.arabic,
        translation: ayahs.translation
      })
      .from(ayahs)
      .innerJoin(surahs, eq(surahs.number, ayahs.surahNumber))
      .where(where)
      .orderBy(asc(ayahs.id))
      .limit(SEARCH_PAGE_SIZE)
      .offset((page - 1) * SEARCH_PAGE_SIZE),
    db.select({ total: count() }).from(ayahs).where(where)
  ]);

  return { results, total };
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

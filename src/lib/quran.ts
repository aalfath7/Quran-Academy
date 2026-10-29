import { and, asc, eq, inArray, or } from "drizzle-orm";
import type { createDb } from "@/db/connection";
import { ayahs, surahs } from "@/db/schema";

// Qur'an data read by the Tartil lessons: the ayahs they drill and the mushaf pages they practise on.

type Db = ReturnType<typeof createDb>;

const pageAyah = {
  id: ayahs.id,
  page: ayahs.page,
  surahNumber: ayahs.surahNumber,
  number: ayahs.number,
  juz: ayahs.juz,
  arabic: ayahs.arabic,
  nameArabic: surahs.nameArabic,
  nameLatin: surahs.nameLatin,
  ayahCount: surahs.ayahCount,
  location: surahs.location
};

/** Every ayah printed on the given mushaf pages, in mushaf order; each ayah keeps its page and surah. */
export function listPagesAyahs(db: Db, pages: number[]) {
  if (pages.length === 0) return Promise.resolve([]);

  return db
    .select(pageAyah)
    .from(ayahs)
    .innerJoin(surahs, eq(surahs.number, ayahs.surahNumber))
    .where(inArray(ayahs.page, pages))
    .orderBy(asc(ayahs.id));
}

export type PageAyah = Awaited<ReturnType<typeof listPagesAyahs>>[number];

/** The given ayahs ({ surah, ayah } pairs) with their surah name; pairs without an ayah are skipped. */
export function listAyahsByRef(db: Db, refs: { surah: number; ayah: number }[]) {
  if (refs.length === 0) return Promise.resolve([]);

  return db
    .select({ surahNumber: ayahs.surahNumber, number: ayahs.number, arabic: ayahs.arabic, nameLatin: surahs.nameLatin })
    .from(ayahs)
    .innerJoin(surahs, eq(surahs.number, ayahs.surahNumber))
    .where(or(...refs.map(({ surah, ayah }) => and(eq(ayahs.surahNumber, surah), eq(ayahs.number, ayah)))));
}

export type AyahByRef = Awaited<ReturnType<typeof listAyahsByRef>>[number];

/** Bismillah is printed before every surah except Al-Fatihah (where it is ayah 1) and At-Taubah. */
export function showsBismillah(surahNumber: number) {
  return surahNumber !== 1 && surahNumber !== 9;
}

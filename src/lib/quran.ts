import quran from "@/data/quran.json";

// Qur'an data read by the Lanjutan lessons: the ayahs they drill and the mushaf pages they practise on.
// src/data/quran.json holds only those ayahs; scripts/build-quran-data.mjs rebuilds it from the Kemenag text.

type Surah = { nameArabic: string; nameLatin: string; ayahCount: number; location: string };

const surahs: Record<string, Surah> = quran.surahs;

export type PageAyah = (typeof quran.ayahs)[number] & Surah;

const ayahs: PageAyah[] = quran.ayahs.map((ayah) => ({ ...ayah, ...surahs[ayah.surahNumber] }));

/** Every ayah printed on the given mushaf pages, in mushaf order; each ayah keeps its page and surah. */
export function listPagesAyahs(pages: number[]) {
  const wanted = new Set(pages);

  return ayahs.filter(({ page }) => wanted.has(page));
}

/** The given ayahs ({ surah, ayah } pairs) with their surah name; pairs without an ayah are skipped. */
export function listAyahsByRef(refs: { surah: number; ayah: number }[]) {
  return ayahs.filter(({ surahNumber, number }) => refs.some(({ surah, ayah }) => surah === surahNumber && ayah === number));
}

export type AyahByRef = PageAyah;

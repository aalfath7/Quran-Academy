// Dependency-free so client components can import it without pulling in Drizzle.

/** The first ayah of a juz, in mushaf order. */
export type JuzStart = { juz: number; surahNumber: number; ayah: number };

type Position = { surahNumber: number; ayah: number };

const isBefore = (a: Position, b: Position) =>
  a.surahNumber < b.surahNumber || (a.surahNumber === b.surahNumber && a.ayah < b.ayah);

/**
 * The ayah of the surah where reading juz `juz` begins: 1 when the surah opens inside the juz,
 * the juz's first ayah when the juz starts mid-surah, or null when the surah has no ayah in it.
 */
export function juzEntryInSurah(starts: JuzStart[], juz: number, surah: { number: number; ayahCount: number }) {
  const start = starts.find((entry) => entry.juz === juz);
  if (!start) return null;

  const next = starts.find((entry) => entry.juz === juz + 1);
  const first = { surahNumber: surah.number, ayah: 1 };
  const last = { surahNumber: surah.number, ayah: surah.ayahCount };
  if (isBefore(last, start) || (next && !isBefore(first, next))) return null;

  return start.surahNumber === surah.number ? start.ayah : 1;
}

/** Link to a surah, scrolled to the given ayah unless that is the first one. */
export function surahHref(surahNumber: number, ayah = 1) {
  return ayah > 1 ? `/quran/${surahNumber}#ayat-${ayah}` : `/quran/${surahNumber}`;
}

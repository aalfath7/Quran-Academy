// Dependency-free so the client reader can import it without pulling in Drizzle.

/** Pages of the Madinah mushaf the ayahs are laid out on. */
export const PAGE_COUNT = 604;

export const MUSHAF_PAGE_KEY = "mushaf-halaman";
export const MUSHAF_SIZE_KEY = "mushaf-ukuran";

/** Reading sizes for the mushaf text, smallest first; the middle one is the default. */
export const mushafSizes = [1.5, 1.75, 2, 2.3, 2.6] as const;
export const DEFAULT_MUSHAF_SIZE = 2;

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

/** 255 → "٢٥٥", the digits printed in a mushaf. */
export function toArabicDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => arabicDigits[Number(digit)]);
}

/** The page saved as last read, or null for a missing, corrupt or out-of-range value. */
export function parseMushafPage(raw: string | null, pageCount: number) {
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 && page <= pageCount ? page : null;
}

/** The saved reading size, or the default when it is not one of the offered sizes. */
export function parseMushafSize(raw: string | null) {
  const size = Number(raw);
  return mushafSizes.some((offered) => offered === size) ? size : DEFAULT_MUSHAF_SIZE;
}

/** The next or previous offered size, staying at either end. */
export function stepMushafSize(size: number, direction: 1 | -1) {
  const index = mushafSizes.findIndex((offered) => offered === size);
  const next = Math.min(Math.max((index === -1 ? 2 : index) + direction, 0), mushafSizes.length - 1);

  return mushafSizes[next];
}

/**
 * Where a horizontal swipe turns the page. A mushaf is read right to left, so like turning a paper page,
 * dragging to the right brings the next page and dragging to the left goes back. Mostly vertical drags scroll.
 */
export function swipeDirection(dx: number, dy: number, threshold = 60): 1 | -1 | 0 {
  if (Math.abs(dx) < threshold || Math.abs(dy) > Math.abs(dx) * 0.6) return 0;

  return dx > 0 ? 1 : -1;
}

export type PauseSegment = { lead: string; word: string; pause: string | null };

/**
 * Splits ayah text around its pause signs (U+06D6–U+06DC, U+08D6) so they can be drawn small in the gap after a
 * word, as a printed mushaf does. Left in the text they are combining marks: the Kemenag text often puts them after
 * a space, glued to the next word, where they overlap it, and a mark cannot be sized apart from its letter.
 * Each segment is plain text (`lead`), then the `word` the `pause` follows. The iqlab mim (U+06E2) also comes after
 * a space but belongs on the tanwin before it, so it is joined to that word instead.
 */
export function pauseSegments(text: string): PauseSegment[] {
  const parts = text.replace(/\s+\u06e2/gu, "\u06e2").split(/\s*([\u06d6-\u06dc\u08d6]+)\s*/u);
  const segments: PauseSegment[] = [];

  for (let i = 0; i < parts.length; i += 2) {
    const [chunk, pause] = [parts[i], parts[i + 1]];
    if (pause === undefined) {
      if (chunk) segments.push({ lead: chunk, word: "", pause: null });
      continue;
    }
    const cut = chunk.lastIndexOf(" ");
    segments.push({ lead: chunk.slice(0, cut + 1), word: chunk.slice(cut + 1), pause });
  }

  return segments;
}

/** Runs of ayahs that belong to the same surah, so each surah's opening can be set apart. */
export function groupBySurah<T extends { surahNumber: number }>(ayahs: T[]) {
  const groups: { surahNumber: number; ayahs: T[] }[] = [];
  for (const ayah of ayahs) {
    const last = groups.at(-1);
    if (last?.surahNumber === ayah.surahNumber) last.ayahs.push(ayah);
    else groups.push({ surahNumber: ayah.surahNumber, ayahs: [ayah] });
  }

  return groups;
}

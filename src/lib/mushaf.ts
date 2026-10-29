// Dependency-free helpers for setting mushaf text: Arabic digits, pause signs, and surah runs.

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

/** 255 → "٢٥٥", the digits printed in a mushaf. */
export function toArabicDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => arabicDigits[Number(digit)]);
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

// Dependency-free so client components can import it without pulling in Drizzle.

/** Lowercase, diacritic-free and without punctuation, so "al fatihah" matches "Al-Fātiḥah". */
export function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export const MIN_TERM_LENGTH = 2;
const MAX_TERMS = 6;

/** Distinct lowercase words of a query; every one of them must appear in a matching ayah. */
export function searchTerms(query: string) {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter((word) => word.length >= MIN_TERM_LENGTH);

  return [...new Set(words)].slice(0, MAX_TERMS);
}

type SurahName = { number: number; nameLatin: string; transliteration: string; ayahCount: number };

/** Names a surah can be typed as: with or without its article ("Al-Baqarah", "Baqarah", "Ar-Rahman", "Rahman"). */
function nameKeys(surah: SurahName) {
  return [surah.nameLatin, surah.transliteration].flatMap((name) => [normalize(name), normalize(name.replace(/^a[a-z]{0,2}-/i, ""))]);
}

/** The surah a query names exactly, by number or by latin name. */
export function findSurah<T extends SurahName>(query: string, surahs: T[]) {
  const trimmed = query.trim();
  if (/^\d{1,3}$/.test(trimmed)) return surahs.find(({ number }) => number === Number(trimmed)) ?? null;

  const needle = normalize(trimmed);
  return (needle && surahs.find((surah) => nameKeys(surah).includes(needle))) || null;
}

/** An ayah reference such as "2:255", "2 255", "al-baqarah 255" or "Yasin:1"; null when the query is not one. */
export function parseAyahReference(query: string, surahs: SurahName[]) {
  const match = query.trim().match(/^(.+?)\s*[\s:.]\s*(\d{1,3})$/);
  if (!match) return null;

  const surah = findSurah(match[1], surahs);
  const ayah = Number(match[2]);

  return surah && ayah >= 1 && ayah <= surah.ayahCount ? { surahNumber: surah.number, ayah } : null;
}

/** Splits text into plain and matched parts, case-insensitively, for highlighting search terms. */
export function highlight(text: string, terms: string[]) {
  if (terms.length === 0) return [{ text, match: false }];

  const escaped = [...terms].sort((a, b) => b.length - a.length).map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

  return text
    .split(pattern)
    .filter(Boolean)
    .map((part) => ({ text: part, match: terms.includes(part.toLowerCase()) }));
}

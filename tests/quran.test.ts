import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import { ayahs, surahs } from "../src/db/schema";
import { juzEntryInSurah, surahHref } from "../src/lib/juz";
import { getAyah, getNeighbourAyahs, getSurah, listAyahs, listAyahsByRef, listJuzPages, listJuzStarts, listPageAyahs, listPagesAyahs, listSurahPages, listSurahs, listSurahsByNumber, paragraphs, parsePositiveInt, searchAyahs, showsBismillah } from "../src/lib/quran";
import { groupBySurah, pauseSegments, parseMushafPage, parseMushafSize, stepMushafSize, swipeDirection, toArabicDigits } from "../src/lib/mushaf";
import { findSurah, highlight, parseAyahReference, searchTerms } from "../src/lib/quran-search";

const surah = (number: number, nameLatin: string, ayahCount: number) => ({
  number,
  nameArabic: "سورة",
  nameLatin,
  transliteration: nameLatin,
  translation: "Terjemah",
  ayahCount,
  location: "Makkiyah" as const,
  page: number,
  introduction: "Paragraf satu.\n\nParagraf dua."
});

const ayah = (id: number, surahNumber: number, number: number, juz = 1) => ({
  id,
  surahNumber,
  number,
  juz,
  page: 1,
  arabic: "آية",
  latin: "āyah",
  translation: `Ayat ${surahNumber}:${number}`,
  tafsirWajiz: "Ringkas",
  tafsirTahlili: "Lengkap"
});

beforeAll(async () => {
  const db = createDb(env.DB);
  await db.insert(surahs).values([surah(2, "Al-Baqarah", 2), surah(1, "Al-Fātiḥah", 2)]);
  await db.insert(ayahs).values([ayah(4, 2, 2, 2), ayah(1, 1, 1), ayah(3, 2, 1), ayah(2, 1, 2)]);
});

describe("quran queries", () => {
  it("lists surahs and their ayahs in mushaf order", async () => {
    const db = createDb(env.DB);

    expect((await listSurahs(db)).map(({ number }) => number)).toEqual([1, 2]);
    expect((await listAyahs(db, 2)).map(({ number }) => number)).toEqual([1, 2]);
    expect((await getSurah(db, 1))?.nameLatin).toBe("Al-Fātiḥah");
    expect(await getSurah(db, 3)).toBeNull();
  });

  it("lists chosen surahs in the requested order, skipping missing ones", async () => {
    const db = createDb(env.DB);

    expect((await listSurahsByNumber(db, [2, 99, 1])).map(({ number }) => number)).toEqual([2, 1]);
  });

  it("finds one ayah with its tafsir", async () => {
    const db = createDb(env.DB);

    expect((await getAyah(db, 2, 1))?.tafsirTahlili).toBe("Lengkap");
    expect(await getAyah(db, 2, 3)).toBeNull();
  });

  it("finds where each juz begins", async () => {
    const db = createDb(env.DB);

    expect(await listJuzStarts(db)).toEqual([
      { juz: 1, surahNumber: 1, ayah: 1 },
      { juz: 2, surahNumber: 2, ayah: 2 }
    ]);
  });

  it("finds neighbouring ayahs across surah boundaries", async () => {
    const db = createDb(env.DB);
    const { previous, next } = await getNeighbourAyahs(db, 2);

    expect(previous).toMatchObject({ surahNumber: 1, number: 1, nameLatin: "Al-Fātiḥah" });
    expect(next).toMatchObject({ surahNumber: 2, number: 1, nameLatin: "Al-Baqarah" });
    expect((await getNeighbourAyahs(db, 1)).previous).toBeNull();
  });

  it("lists the ayahs of a mushaf page with their surah, and where surahs and juz begin", async () => {
    const db = createDb(env.DB);
    const page = await listPageAyahs(db, 1);

    expect(page.map(({ id }) => id)).toEqual([1, 2, 3, 4]);
    expect(page[2]).toMatchObject({ surahNumber: 2, number: 1, nameLatin: "Al-Baqarah", ayahCount: 2 });
    expect(await listPageAyahs(db, 2)).toEqual([]);
    expect(await listSurahPages(db)).toEqual([
      { number: 1, nameLatin: "Al-Fātiḥah", page: 1 },
      { number: 2, nameLatin: "Al-Baqarah", page: 2 }
    ]);
    expect(await listJuzPages(db)).toEqual([
      { juz: 1, page: 1 },
      { juz: 2, page: 1 }
    ]);
  });

  it("lists the ayahs of several mushaf pages in mushaf order", async () => {
    const db = createDb(env.DB);

    expect((await listPagesAyahs(db, [1, 99])).map(({ id, page }) => [id, page])).toEqual([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1]
    ]);
    expect(await listPagesAyahs(db, [])).toEqual([]);
  });

  it("finds ayahs by reference, skipping ones that do not exist", async () => {
    const db = createDb(env.DB);
    const found = await listAyahsByRef(db, [
      { surah: 2, ayah: 1 },
      { surah: 1, ayah: 2 },
      { surah: 9, ayah: 9 }
    ]);

    expect(found.map(({ surahNumber, number, nameLatin }) => [surahNumber, number, nameLatin]).sort()).toEqual([
      [1, 2, "Al-Fātiḥah"],
      [2, 1, "Al-Baqarah"]
    ]);
    expect(await listAyahsByRef(db, [])).toEqual([]);
  });

  it("searches translations for every term, in mushaf order", async () => {
    const db = createDb(env.DB);
    const { results, total } = await searchAyahs(db, ["AYAT", "2:"]);

    expect(total).toBe(2);
    expect(results.map(({ id }) => id)).toEqual([3, 4]);
    expect(results[0]).toMatchObject({ surahNumber: 2, number: 1, nameLatin: "Al-Baqarah" });
    expect((await searchAyahs(db, ["ayat", "1:2"])).results.map(({ id }) => id)).toEqual([2]);
    expect(await searchAyahs(db, [])).toEqual({ results: [], total: 0 });
  });

  it("treats LIKE wildcards in search terms literally", async () => {
    const db = createDb(env.DB);

    expect((await searchAyahs(db, ["%"])).total).toBe(0);
    expect((await searchAyahs(db, ["ay_t"])).total).toBe(0);
  });
});

describe("quran helpers", () => {
  it("only accepts canonical positive integers from the URL", () => {
    expect(parsePositiveInt("114")).toBe(114);
    expect(["0", "01", "-1", "2a", "1.5", ""].map(parsePositiveInt)).toEqual([null, null, null, null, null, null]);
  });

  it("omits the bismillah header for Al-Fatihah and At-Taubah", () => {
    expect([1, 2, 9, 114].map(showsBismillah)).toEqual([false, true, false, true]);
  });

  it("splits text into trimmed paragraphs", () => {
    expect(paragraphs(" satu \n\n\tdua\n")).toEqual(["satu", "dua"]);
    expect(paragraphs(null)).toEqual([]);
  });
});

describe("juz helpers", () => {
  // Juz 1 runs from 1:1 to 2:141, juz 2 from 2:142 to 2:252, juz 3 from 2:253 to 3:92.
  const starts = [
    { juz: 1, surahNumber: 1, ayah: 1 },
    { juz: 2, surahNumber: 2, ayah: 142 },
    { juz: 3, surahNumber: 2, ayah: 253 },
    { juz: 4, surahNumber: 3, ayah: 93 }
  ];
  const alFatihah = { number: 1, ayahCount: 7 };
  const alBaqarah = { number: 2, ayahCount: 286 };
  const aliImran = { number: 3, ayahCount: 200 };

  it("finds the ayah where a juz begins inside each surah", () => {
    expect([alFatihah, alBaqarah, aliImran].map((surah) => juzEntryInSurah(starts, 1, surah))).toEqual([1, 1, null]);
    expect([alFatihah, alBaqarah, aliImran].map((surah) => juzEntryInSurah(starts, 2, surah))).toEqual([null, 142, null]);
    expect([alFatihah, alBaqarah, aliImran].map((surah) => juzEntryInSurah(starts, 3, surah))).toEqual([null, 253, 1]);
    expect(juzEntryInSurah(starts, 4, aliImran)).toBe(93);
    expect(juzEntryInSurah(starts, 31, alFatihah)).toBeNull();
  });

  it("links to the ayah only when it is not the first", () => {
    expect(surahHref(2, 142)).toBe("/quran/2#ayat-142");
    expect(surahHref(2, 1)).toBe("/quran/2");
    expect(surahHref(2)).toBe("/quran/2");
  });
});

describe("search helpers", () => {
  const surahs = [
    { number: 1, nameLatin: "Al-Fātiḥah", transliteration: "Al-Fatihah", ayahCount: 7 },
    { number: 2, nameLatin: "Al-Baqarah", transliteration: "Al-Baqarah", ayahCount: 286 },
    { number: 36, nameLatin: "Yāsīn", transliteration: "Yasin", ayahCount: 83 },
    { number: 55, nameLatin: "Ar-Raḥmān", transliteration: "Ar-Rahman", ayahCount: 78 }
  ];

  it("splits a query into distinct words without surrounding punctuation", () => {
    expect(searchTerms("  Orang-orang yang, YANG bertakwa! a ")).toEqual(["orang-orang", "yang", "bertakwa"]);
    expect(searchTerms("a ,")).toEqual([]);
  });

  it("finds a surah by number or by name with or without its article", () => {
    expect(["36", "yasin", "Yāsīn", "al baqarah", "baqarah", "rahman", "ar-rahman"].map((query) => findSurah(query, surahs)?.number)).toEqual([
      36, 36, 36, 2, 2, 55, 55
    ]);
    expect(findSurah("sabar", surahs)).toBeNull();
    expect(findSurah("3", surahs)).toBeNull();
  });

  it("parses ayah references within the surah's length", () => {
    expect(parseAyahReference("2:255", surahs)).toEqual({ surahNumber: 2, ayah: 255 });
    expect(parseAyahReference("2 255", surahs)).toEqual({ surahNumber: 2, ayah: 255 });
    expect(parseAyahReference("Al-Baqarah 255", surahs)).toEqual({ surahNumber: 2, ayah: 255 });
    expect(parseAyahReference("yasin:1", surahs)).toEqual({ surahNumber: 36, ayah: 1 });
    expect(["2:287", "2:0", "sabar 2", "2:", "kasih sayang"].map((query) => parseAyahReference(query, surahs))).toEqual([
      null,
      null,
      null,
      null,
      null
    ]);
  });

  it("marks search terms in text case-insensitively", () => {
    expect(highlight("Allah Maha Pengasih, maha penyayang", ["maha"])).toEqual([
      { text: "Allah ", match: false },
      { text: "Maha", match: true },
      { text: " Pengasih, ", match: false },
      { text: "maha", match: true },
      { text: " penyayang", match: false }
    ]);
    expect(highlight("teks", [])).toEqual([{ text: "teks", match: false }]);
  });
});

describe("mushaf helpers", () => {
  it("prints numbers in Arabic-Indic digits", () => {
    expect(toArabicDigits(604)).toBe("٦٠٤");
    expect(toArabicDigits(10)).toBe("١٠");
  });

  it("reads saved pages and sizes defensively", () => {
    expect(parseMushafPage("255", 604)).toBe(255);
    expect([null, "0", "605", "1.5", "abc"].map((raw) => parseMushafPage(raw, 604))).toEqual([null, null, null, null, null]);
    expect(parseMushafSize("2.3")).toBe(2.3);
    expect(parseMushafSize("9")).toBe(2);
  });

  it("steps the reading size and stops at either end", () => {
    expect(stepMushafSize(2, 1)).toBe(2.3);
    expect(stepMushafSize(1.5, -1)).toBe(1.5);
    expect(stepMushafSize(2.6, 1)).toBe(2.6);
  });

  it("turns the page right to left on a mostly horizontal swipe", () => {
    expect(swipeDirection(120, 10)).toBe(1);
    expect(swipeDirection(-120, 10)).toBe(-1);
    expect(swipeDirection(30, 0)).toBe(0);
    expect(swipeDirection(100, 90)).toBe(0);
  });

  it("splits pause signs out of the text, after the word they follow", () => {
    expect(pauseSegments("وَلَا يَحْزُنْكَ قَوْلُهُمْ ۘ اِنَّ الْعِزَّةَ")).toEqual([
      { lead: "وَلَا يَحْزُنْكَ ", word: "قَوْلُهُمْ", pause: "ۘ" },
      { lead: "اِنَّ الْعِزَّةَ", word: "", pause: null }
    ]);
    expect(pauseSegments("لَهُمْ ۗوَاِذَآ")).toEqual([
      { lead: "", word: "لَهُمْ", pause: "ۗ" },
      { lead: "وَاِذَآ", word: "", pause: null }
    ]);
    expect(pauseSegments("الْاَرْضِۙ قَالُوْٓا")[0]).toEqual({ lead: "", word: "الْاَرْضِ", pause: "ۙ" });
    expect(pauseSegments("قَدِيْرٌ ࣖ")).toEqual([{ lead: "", word: "قَدِيْرٌ", pause: "ࣖ" }]);
  });

  it("joins the iqlab mim to the tanwin before it", () => {
    expect(pauseSegments("كُلًّا ۢ بِسِيْمٰىهُمْ")).toEqual([{ lead: "كُلًّاۢ بِسِيْمٰىهُمْ", word: "", pause: null }]);
  });

  it("groups consecutive ayahs by surah", () => {
    const groups = groupBySurah([{ surahNumber: 112 }, { surahNumber: 112 }, { surahNumber: 113 }]);

    expect(groups.map(({ surahNumber, ayahs }) => [surahNumber, ayahs.length])).toEqual([
      [112, 2],
      [113, 1]
    ]);
  });
});

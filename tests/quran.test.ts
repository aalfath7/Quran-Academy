import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import { ayahs, surahs } from "../src/db/schema";
import { juzEntryInSurah, surahHref } from "../src/lib/juz";
import { getAyah, getNeighbourAyahs, getSurah, listAyahs, listJuzStarts, listSurahs, listSurahsByNumber, paragraphs, parsePositiveInt, showsBismillah } from "../src/lib/quran";

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

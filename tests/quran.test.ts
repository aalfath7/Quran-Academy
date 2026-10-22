import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import { ayahs, surahs } from "../src/db/schema";
import { getAyah, getNeighbourAyahs, getSurah, listAyahs, listSurahs, listSurahsByNumber, paragraphs, parsePositiveInt, showsBismillah } from "../src/lib/quran";

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

const ayah = (id: number, surahNumber: number, number: number) => ({
  id,
  surahNumber,
  number,
  juz: 1,
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
  await db.insert(ayahs).values([ayah(4, 2, 2), ayah(1, 1, 1), ayah(3, 2, 1), ayah(2, 1, 2)]);
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

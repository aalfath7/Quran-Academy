import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import { ayahs, surahs } from "../src/db/schema";
import { listAyahsByRef, listPagesAyahs, showsBismillah } from "../src/lib/quran";
import { groupBySurah, pauseSegments, toArabicDigits } from "../src/lib/mushaf";

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

});

describe("quran helpers", () => {
  it("omits the bismillah header for Al-Fatihah and At-Taubah", () => {
    expect([1, 2, 9, 114].map(showsBismillah)).toEqual([false, true, false, true]);
  });

});

describe("mushaf helpers", () => {
  it("prints numbers in Arabic-Indic digits", () => {
    expect(toArabicDigits(604)).toBe("٦٠٤");
    expect(toArabicDigits(10)).toBe("١٠");
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

import { describe, expect, it } from "vitest";
import { listLessons } from "../src/lib/lessons";
import { meetingDrills, meetingPages, meetingPlan } from "../src/lib/meeting-plan";
import { groupBySurah, pauseSegments, showsBismillah, toArabicDigits } from "../src/lib/mushaf";
import { listAyahsByRef, listPagesAyahs } from "../src/lib/quran";

describe("static quran data", () => {
  it("lists the ayahs of several mushaf pages in mushaf order", () => {
    const ayahs = listPagesAyahs([603, 604]);
    expect(ayahs[0]).toMatchObject({ surahNumber: 109, number: 1, page: 603, nameLatin: "Al-Kāfirūn" });
    expect(ayahs.at(-1)).toMatchObject({ surahNumber: 114, number: 6, page: 604 });
    expect(ayahs.map(({ id }) => id)).toEqual(ayahs.map(({ id }) => id).sort((a, b) => a - b));
    expect(listPagesAyahs([])).toEqual([]);
  });

  it("finds ayahs by reference, skipping ones that are not in the data", () => {
    const found = listAyahsByRef([
      { surah: 112, ayah: 1 },
      { surah: 9, ayah: 999 }
    ]);
    expect(found.map(({ surahNumber, number }) => [surahNumber, number])).toEqual([[112, 1]]);
    expect(listAyahsByRef([])).toEqual([]);
  });

  it("holds every ayah and page the Tartil meetings use", () => {
    for (const { slug, content } of listLessons("tajwid")) {
      const plan = meetingPlan(content);
      if (!plan) continue;
      const drills = meetingDrills(plan);
      expect(listAyahsByRef(drills), slug).toHaveLength(drills.length);
      for (const page of meetingPages(plan)) expect(listPagesAyahs([page]).length, `${slug} halaman ${page}`).toBeGreaterThan(0);
    }
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

import { describe, expect, it } from "vitest";
import { contentBlocks, drillRows, getLesson, listAllLessons, listLessons, practiceSections, soundKey } from "../src/lib/lessons";

describe("static lessons", () => {
  it("lists each category in order, with unique slugs", () => {
    const slugs = listAllLessons().map(({ slug }) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const category of ["praktik", "tajwid"] as const) {
      const lessons = listLessons(category);
      expect(lessons.every((lesson) => lesson.category === category)).toBe(true);
      const positions = lessons.map(({ position }) => position);
      expect(positions).toEqual([...positions].sort((a, b) => a - b));
    }
  });

  it("keeps every lesson within the old form limits", () => {
    for (const { slug, title, summary, content } of listAllLessons()) {
      expect(slug, slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(title.length, slug).toBeGreaterThanOrEqual(3);
      expect(summary.length, slug).toBeGreaterThanOrEqual(10);
      expect(content.length, slug).toBeGreaterThanOrEqual(20);
    }
  });

  it("finds a lesson by slug", () => {
    expect(getLesson("praktik-sukun")?.category).toBe("praktik");
    expect(getLesson("tes-awal-dan-peta-makhraj")?.category).toBe("tajwid");
    expect(getLesson("jazariyah-muqaddimah")).toBeNull();
  });
});

describe("lesson content", () => {
  it("flags paragraphs written only in Arabic", () => {
    const blocks = contentBlocks("Pengantar.\n\nقِفَا نَبْكِ\nمِنْ ذِكْرَى\n\n  \n\nContoh: إِنَّ اللَّهَ");

    expect(blocks).toEqual([
      { text: "Pengantar.", arabic: false },
      { text: "قِفَا نَبْكِ\nمِنْ ذِكْرَى", arabic: true },
      { text: "Contoh: إِنَّ اللَّهَ", arabic: false }
    ]);
  });
});

describe("practice content", () => {
  it("splits drill rows into groups separated by wide spaces", () => {
    expect(drillRows(" بَ بَ   بِ بِ \n\nتَ")).toEqual([["بَ بَ", "بِ بِ"], ["تَ"]]);
  });

  it("separates the guide from labelled drills", () => {
    const content = "Petunjuk satu.\n\nPetunjuk dua.\n\nBa — بَ ba\n\nبَ بَ   بِ بِ\n\nبُ بُ\n\nCatatan akhir";

    expect(practiceSections(content)).toEqual({
      guide: ["Petunjuk satu.", "Petunjuk dua."],
      sections: [
        { label: "Ba — بَ ba", rows: [["بَ بَ", "بِ بِ"]] },
        { label: undefined, rows: [["بُ بُ"]] },
        { label: "Catatan akhir", rows: [] }
      ]
    });
    expect(practiceSections("Hanya teks.")).toEqual({ guide: ["Hanya teks."], sections: [] });
    expect(practiceSections("بَ")).toEqual({ guide: [], sections: [{ label: undefined, rows: [["بَ"]] }] });
  });
});

describe("sound keys", () => {
  it("reads a practice label written as reading = form pairs", () => {
    expect(soundKey("a = أَ = ءَ · i = إِ = ءِ")).toEqual([
      { reading: "a", forms: ["أَ", "ءَ"] },
      { reading: "i", forms: ["إِ", "ءِ"] }
    ]);
    expect(soundKey("ba = بَ")).toEqual([{ reading: "ba", forms: ["بَ"] }]);
  });

  it("leaves ordinary labels alone", () => {
    expect(soundKey("Latihan campuran")).toBeNull();
    expect(soundKey("Rangkuman: fathah")).toBeNull();
    expect(soundKey("Huruf = bunyi")).toBeNull();
  });
});

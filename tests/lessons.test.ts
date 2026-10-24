import { env } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import {
  contentBlocks,
  drillRows,
  practiceSections,
  soundKey,
  createLesson,
  getPublishedLesson,
  isSlugTaken,
  lessonInputSchema,
  listPublishedLessons,
  slugify,
  type LessonInput
} from "../src/lib/lessons";

function input(overrides: Partial<LessonInput> = {}): LessonInput {
  return {
    title: "Hukum nun sukun",
    slug: "hukum-nun-sukun",
    category: "tajwid",
    summary: "Mengenal empat hukum nun sukun dan tanwin.",
    arabicText: null,
    content: "Nun sukun dan tanwin memiliki empat hukum bacaan.",
    position: 0,
    published: true,
    ...overrides
  };
}

describe("lesson input", () => {
  it("derives a slug from the title when none is given", () => {
    const parsed = lessonInputSchema.parse({ ...input(), slug: "", arabicText: "  " });

    expect(parsed.slug).toBe("hukum-nun-sukun");
    expect(parsed.arabicText).toBeNull();
  });

  it("slugifies accented and punctuated text", () => {
    expect(slugify("  Qalqalah: Ṣughrā & Kubrā!  ")).toBe("qalqalah-sughra-kubra");
  });

  it("reports field errors", () => {
    const result = lessonInputSchema.safeParse({ ...input(), title: "ab", category: "fiqih" });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(expect.arrayContaining(["title", "category"]));
  });
});

describe("lesson queries", () => {
  it("only exposes published lessons, filtered and ordered", async () => {
    const db = createDb(env.DB);
    await createLesson(db, input({ slug: "tajwid-2", title: "Tajwid kedua", position: 2 }));
    await createLesson(db, input({ slug: "tajwid-1", title: "Tajwid pertama", position: 1 }));
    await createLesson(db, input({ slug: "tajwid-draft", published: false }));
    await createLesson(db, input({ slug: "jazariyah-1", category: "jazariyah" }));
    await createLesson(db, input({ slug: "praktik-1", category: "praktik" }));

    const tajwid = await listPublishedLessons(db, "tajwid");
    expect(tajwid.map(({ slug }) => slug)).toEqual(["tajwid-1", "tajwid-2"]);
    expect(await getPublishedLesson(db, "tajwid-draft")).toBeNull();
    expect((await listPublishedLessons(db)).map(({ slug }) => slug)).toEqual(["praktik-1", "tajwid-1", "tajwid-2", "jazariyah-1"]);
    expect((await listPublishedLessons(db, ["tajwid", "jazariyah"])).map(({ slug }) => slug)).toEqual(["tajwid-1", "tajwid-2", "jazariyah-1"]);
  });

  it("detects slug conflicts except for the lesson itself", async () => {
    const db = createDb(env.DB);
    const id = await createLesson(db, input({ slug: "unik" }));

    expect(await isSlugTaken(db, "unik")).toBe(true);
    expect(await isSlugTaken(db, "unik", id)).toBe(false);
    expect(await isSlugTaken(db, "lain")).toBe(false);
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

import { env } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import {
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
    await createLesson(db, input({ slug: "tilawah-1", category: "tilawah" }));

    const tajwid = await listPublishedLessons(db, "tajwid");
    expect(tajwid.map(({ slug }) => slug)).toEqual(["tajwid-1", "tajwid-2"]);
    expect(await getPublishedLesson(db, "tajwid-draft")).toBeNull();
    expect((await listPublishedLessons(db)).length).toBe(3);
  });

  it("detects slug conflicts except for the lesson itself", async () => {
    const db = createDb(env.DB);
    const id = await createLesson(db, input({ slug: "unik" }));

    expect(await isSlugTaken(db, "unik")).toBe(true);
    expect(await isSlugTaken(db, "unik", id)).toBe(false);
    expect(await isSlugTaken(db, "lain")).toBe(false);
  });
});

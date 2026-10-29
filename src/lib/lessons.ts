import { lessons as practicePart2 } from "@/data/praktik-bagian-2";
import { lessons as practicePart3 } from "@/data/praktik-bagian-3";
import { lessons as practicePart4 } from "@/data/praktik-bagian-4";
import { lessons as practicePart1 } from "@/data/praktik-dasar";
import { lessons as tajwidMeetings } from "@/data/tajwid-pertemuan";
import type { LessonCategory } from "./categories";

// Lessons are static data in src/data: Pemula practices and the Lanjutan (tajwid) class meetings.

export type Lesson = {
  slug: string;
  title: string;
  category: LessonCategory;
  summary: string;
  arabicText: string | null;
  content: string;
  position: number;
};

const byPosition = (a: Lesson, b: Lesson) => a.position - b.position;

const lessonsByCategory: Record<LessonCategory, Lesson[]> = {
  praktik: [...practicePart1, ...practicePart2, ...practicePart3, ...practicePart4].sort(byPosition),
  tajwid: [...tajwidMeetings].sort(byPosition)
};

/** The lessons of one category, in order. */
export function listLessons(category: LessonCategory) {
  return lessonsByCategory[category];
}

/** Every lesson, practices first. */
export function listAllLessons() {
  return [...lessonsByCategory.praktik, ...lessonsByCategory.tajwid];
}

export function getLesson(slug: string) {
  return listAllLessons().find((lesson) => lesson.slug === slug) ?? null;
}

/** Paragraphs of lesson content; one written only in Arabic script (a bait of a matan, an ayah) is flagged so the page can set it apart. */
export function contentBlocks(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text) => ({ text, arabic: !/[A-Za-z]/.test(text) && /[؀-ۿ]/.test(text) }));
}

/** Rows of a reading drill; within a row, two or more spaces separate groups that are read in one breath. */
export function drillRows(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/\s{2,}/));
}

/**
 * Practice content: text before the first drill is the guide, except the paragraph right before it,
 * which labels that drill like every later text paragraph labels the drill after it.
 */
export function practiceSections(content: string) {
  const blocks = contentBlocks(content);
  const firstDrill = blocks.findIndex(({ arabic }) => arabic);
  const guideEnd = firstDrill > 0 && !blocks[firstDrill - 1].arabic ? firstDrill - 1 : Math.max(firstDrill, 0);
  const guide = (firstDrill === -1 ? blocks : blocks.slice(0, guideEnd)).map(({ text }) => text);

  const sections: { label?: string; rows: string[][] }[] = [];
  let label: string | undefined;
  for (const block of firstDrill === -1 ? [] : blocks.slice(guideEnd)) {
    if (block.arabic) {
      sections.push({ label, rows: drillRows(block.text) });
      label = undefined;
    } else {
      if (label) sections.push({ label, rows: [] });
      label = block.text;
    }
  }
  if (label) sections.push({ label, rows: [] });

  return { guide, sections };
}

/** A practice label written as a sound key ("ba = بَ · bi = بِ · bu = بُ"), or null for an ordinary label. */
export function soundKey(label: string) {
  const entries = label.split(" · ").map((entry) => entry.split(" = ").map((part) => part.trim()));
  const isKey = entries.every(
    ([reading, ...forms]) =>
      forms.length > 0 && !/[؀-ۿ]/.test(reading) && forms.every((form) => /[؀-ۿ]/.test(form) && !/[A-Za-z]/.test(form))
  );

  return isKey ? entries.map(([reading, ...forms]) => ({ reading, forms })) : null;
}

/** How many drill sections a practice has, i.e. how many can be marked fluent. */
export function practiceDrillCount(content: string) {
  return practiceSections(content).sections.filter(({ rows }) => rows.length > 0).length;
}

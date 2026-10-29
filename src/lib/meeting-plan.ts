// Turns the content of a tajwid meeting into the steps of a class: materi, ayat drills, mushaf practice and
// homework. Like lesson-layout, it reads plain-text conventions (see scripts/data/tajwid-pertemuan.mjs), so a
// meeting written in the admin form lays out the same way:
//
//   Materi                              then paragraphs laid out by lessonLayout, up to the next step; a short
//                                       first line of a paragraph titles a part of the materi
//   Latihan ayat                        then one drill per line: "1:2 | الْحَمْدُ | what to listen for"
//   Praktik mushaf: 604                 or a range, "603–604", then the instructions on the next lines
//   Tugas mandiri: …
//
// Any other block (such as "Bentuk ujian") outside the materi is kept as its own titled step.

import { lessonLayout, type Part, type Section } from "./lesson-layout";

export type Drill = { surah: number; ayah: number; words: string; note: string };

export type MeetingStep =
  | { kind: "materi"; sections: Section[] }
  | { kind: "drills"; intro: Part[]; drills: Drill[] }
  | { kind: "mushaf"; from: number; to: number; parts: Part[] }
  | { kind: "task"; text: string }
  | { kind: "other"; title: string | null; parts: Part[] };

export type MeetingPlan = { steps: MeetingStep[]; source: string | null };

const DRILL = /^(\d{1,3}):(\d{1,3})\s*\|\s*([^|]+?)\s*\|\s*(.+)$/;
const MUSHAF = /^Praktik mushaf:\s*(\d{1,3})(?:\s*[–-]\s*(\d{1,3}))?\.?$/;
const TASK = /^Tugas mandiri:\s*([\s\S]+)$/;
const STEP_HEADING = /^(Materi|Latihan ayat)(?::\s*(.*))?$/;

const partsOf = (text: string) => (text.trim() ? lessonLayout(text).sections.flatMap((section) => section.parts) : []);

/** The meeting's steps, or null when the content is not written as a meeting (an ordinary tajwid lesson). */
export function meetingPlan(content: string): MeetingPlan | null {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  let source: string | null = null;
  if (blocks.length > 0 && /^Rujukan:/.test(blocks[blocks.length - 1])) source = blocks.pop()!.replace(/^Rujukan:\s*/, "");

  const steps: MeetingStep[] = [];
  // Paragraphs of the materi, gathered until the next step starts.
  let materi: string[] | null = null;
  const closeMateri = () => {
    if (materi) steps.push({ kind: "materi", sections: lessonLayout(materi.join("\n\n")).sections });
    materi = null;
  };

  for (const block of blocks) {
    const [first, ...rest] = block.split("\n").map((line) => line.trim());
    const heading = first.match(STEP_HEADING);
    const startsStep = TASK.test(block) || MUSHAF.test(first) || heading !== null;

    if (materi && !startsStep) {
      materi.push(block);
      continue;
    }
    closeMateri();

    if (heading?.[1] === "Materi") {
      materi = [[heading[2], ...rest].filter(Boolean).join("\n")].filter(Boolean);
      continue;
    }

    const body = rest.join("\n");

    const task = block.match(TASK);
    if (task) {
      steps.push({ kind: "task", text: task[1].trim() });
      continue;
    }

    const mushaf = first.match(MUSHAF);
    if (mushaf) {
      const from = Number(mushaf[1]);
      steps.push({ kind: "mushaf", from, to: mushaf[2] ? Number(mushaf[2]) : from, parts: partsOf(body) });
      continue;
    }

    if (heading?.[1] === "Latihan ayat") {
      const drills: Drill[] = [];
      const intro: string[] = heading[2] ? [heading[2]] : [];
      for (const line of rest) {
        const drill = line.match(DRILL);
        if (drill) drills.push({ surah: Number(drill[1]), ayah: Number(drill[2]), words: drill[3], note: drill[4] });
        else intro.push(line);
      }
      steps.push({ kind: "drills", intro: partsOf(intro.join("\n")), drills });
      continue;
    }

    for (const section of lessonLayout(block).sections) {
      steps.push({ kind: "other", title: section.title ?? section.group ?? null, parts: section.parts });
    }
  }
  closeMateri();

  return steps.some(({ kind }) => kind === "drills" || kind === "mushaf" || kind === "task") ? { steps, source } : null;
}

/** The pages of one mushaf practice, in order. */
export const mushafRange = ({ from, to }: { from: number; to: number }) => Array.from({ length: Math.max(0, to - from) + 1 }, (_, i) => from + i);

/** Every mushaf page the meeting shows, in order. */
export function meetingPages(plan: MeetingPlan) {
  return plan.steps.flatMap((step) => (step.kind === "mushaf" ? mushafRange(step) : []));
}

/** Every ayah drilled in the meeting. */
export function meetingDrills(plan: MeetingPlan) {
  return plan.steps.flatMap((step) => (step.kind === "drills" ? step.drills : []));
}

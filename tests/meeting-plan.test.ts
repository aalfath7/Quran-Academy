import { describe, expect, it } from "vitest";
import { lessons, obsoleteSlugs } from "../scripts/data/tajwid-pertemuan.mjs";
import { meetingDrills, meetingPages, meetingPlan } from "../src/lib/meeting-plan";
import { groupByStage, MEETING_TOTAL, tajwidStage, tajwidStages } from "../src/lib/tajwid-curriculum";

const sample = `Materi
• Pangkal tenggorokan: ء dan ه.
• Kesalahan umum: ع dibaca seperti hamzah.

Latihan ayat
100:1 | وَالْعَادِيَاتِ ضَبْحًا | ع dan ح dari tengah tenggorokan
113:3 | غَاسِقٍ | غ dan ق tebal

Praktik mushaf: 603–604
Baca dari Al-Lahab sampai An-Nas.

Tugas mandiri: Baca Al-'Adiyat 3 kali sehari.

Rujukan: Modul Kelas Tajwid.`;

describe("meeting plan", () => {
  it("reads the four steps of a meeting in order", () => {
    const plan = meetingPlan(sample)!;

    expect(plan.source).toBe("Modul Kelas Tajwid.");
    expect(plan.steps.map(({ kind }) => kind)).toEqual(["materi", "drills", "mushaf", "task"]);
    expect(plan.steps[0]).toMatchObject({
      kind: "materi",
      sections: [{ parts: [{ kind: "list", items: [{ term: "Pangkal tenggorokan" }, { term: "Kesalahan umum" }] }] }]
    });
    expect(plan.steps[2]).toMatchObject({ kind: "mushaf", from: 603, to: 604, parts: [{ kind: "paragraph", text: "Baca dari Al-Lahab sampai An-Nas." }] });
    expect(plan.steps[3]).toEqual({ kind: "task", text: "Baca Al-'Adiyat 3 kali sehari." });
  });

  it("collects the drilled ayahs and the pages to list", () => {
    const plan = meetingPlan(sample)!;

    expect(meetingDrills(plan)).toEqual([
      { surah: 100, ayah: 1, words: "وَالْعَادِيَاتِ ضَبْحًا", note: "ع dan ح dari tengah tenggorokan" },
      { surah: 113, ayah: 3, words: "غَاسِقٍ", note: "غ dan ق tebal" }
    ]);
    expect(meetingPages(plan)).toEqual([603, 604]);
    expect(meetingPages(meetingPlan("Praktik mushaf: 582–584")!)).toEqual([582, 583, 584]);
  });

  it("gathers titled paragraphs into the materi until the next step", () => {
    const plan = meetingPlan(`Materi
Makhraj adalah tempat keluarnya huruf.

Al-jauf
• Alif sukun didahului fathah: قَالَ

Tugas mandiri: Rekam Al-Fatihah.`)!;

    expect(plan.steps.map(({ kind }) => kind)).toEqual(["materi", "task"]);
    expect(plan.steps[0]).toMatchObject({
      kind: "materi",
      sections: [
        { parts: [{ kind: "paragraph", text: "Makhraj adalah tempat keluarnya huruf." }] },
        { title: "Al-jauf", parts: [{ kind: "list", items: [{ term: "Alif sukun didahului fathah", examples: [["قَالَ"]] }] }] }
      ]
    });
  });

  it("keeps drill lines that are not ayah references as the drill introduction", () => {
    const plan = meetingPlan("Latihan ayat\nSiapkan 5 ayat contoh sendiri.")!;

    expect(plan.steps).toEqual([{ kind: "drills", intro: [{ kind: "paragraph", text: "Siapkan 5 ayat contoh sendiri." }], drills: [] }]);
  });

  it("leaves ordinary lessons to the lesson layout", () => {
    expect(meetingPlan("Pengantar singkat.\n\nIzhhar\n• Hukum: dibaca jelas.")).toBeNull();
  });
});

describe("tajwid class", () => {
  it("splits 26 meetings into five stages", () => {
    expect(tajwidStages.map(({ from, to }) => [from, to])).toEqual([
      [1, 5],
      [6, 10],
      [11, 15],
      [16, 20],
      [21, 26]
    ]);
    expect(tajwidStage(7).number).toBe(2);
    expect(tajwidStage(40).number).toBe(5);
    expect(groupByStage(lessons).map(({ items }) => items.length)).toEqual([5, 5, 5, 5, 6]);
  });

  it("writes every seeded meeting as a plan with valid drills and pages", () => {
    expect(lessons).toHaveLength(MEETING_TOTAL);
    expect(new Set(lessons.map(({ slug }: { slug: string }) => slug)).size).toBe(MEETING_TOTAL);
    expect(lessons.filter(({ slug }: { slug: string }) => obsoleteSlugs.includes(slug))).toEqual([]);

    for (const { slug, content, summary } of lessons as { slug: string; content: string; summary: string }[]) {
      const plan = meetingPlan(content);
      expect(plan, slug).not.toBeNull();
      expect(plan!.source, slug).toMatch(/^Modul Kelas Tajwid/);
      expect(plan!.steps.some(({ kind }) => kind === "task"), slug).toBe(true);
      expect(summary.length, slug).toBeLessThanOrEqual(300);

      for (const { surah, ayah, words } of meetingDrills(plan!)) {
        expect(surah >= 1 && surah <= 114 && ayah >= 1, `${slug} ${surah}:${ayah}`).toBe(true);
        expect(words, `${slug} ${surah}:${ayah}`).toMatch(/[؀-ۿ]/);
      }
      for (const step of plan!.steps) {
        if (step.kind === "mushaf") expect(step.from >= 1 && step.to <= 604 && step.from <= step.to, slug).toBe(true);
      }
    }
  });
});

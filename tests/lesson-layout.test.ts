import { describe, expect, it } from "vitest";
import { lessons } from "../scripts/data/tajwid-ringkas.mjs";
import { arabicRuns, exampleGroups, lessonLayout, readingMinutes, verseParts, type Part } from "../src/lib/lesson-layout";

const parts = (content: string) => lessonLayout(content).sections.flatMap((section) => section.parts);

describe("tajwid lesson layout", () => {
  it("splits content into titled sections, keeping the intro and the reference apart", () => {
    const layout = lessonLayout(`Pengantar singkat.

1. Al-Jauf (Rongga Mulut)
Al-jauf artinya rongga.

Sebab hamzah

5. Mad Wajib Muttashil
Huruf mad dan hamzah dalam satu kata.

Rujukan: Kitab Tajwid Ringkas.`);

    expect(layout.source).toBe("Kitab Tajwid Ringkas.");
    expect(layout.sections.map(({ number, title, group }) => [number, title ?? group])).toEqual([
      [undefined, undefined],
      ["1", "Al-Jauf (Rongga Mulut)"],
      [undefined, "Sebab hamzah"],
      ["5", "Mad Wajib Muttashil"]
    ]);
    expect(layout.sections[2].group).toBe("Sebab hamzah");
  });

  it("opens a numbered section with a circled step that has an explanation", () => {
    const [, section] = lessonLayout(`Pengantar.

① Waqaf Idhthirari, karena terpaksa
Qari' berhenti karena napas habis.
Hukum: boleh berhenti di kata mana saja.`).sections;

    expect(section).toMatchObject({ number: "1", title: "Waqaf Idhthirari, karena terpaksa" });
    expect(section.parts).toEqual([
      { kind: "paragraph", text: "Qari' berhenti karena napas habis." },
      { kind: "fact", label: "Hukum", text: "boleh berhenti di kata mana saja." }
    ]);
  });

  it("reads points as terms with their Arabic examples", () => {
    expect(
      parts(`Lidah memiliki banyak makhraj.
• Qaf (ق): pangkal lidah terangkat. Contoh: أَقْرَبُ، أُقْسِمُ
• Ya sukun setelah kasrah: قِيلَ، وَحِيلَ
• Bagian terdalam: hamzah (ء) dan ha (هـ).
Contoh: يَأْكُلُ، مُؤْمِنٌ`)[1]
    ).toEqual({
      kind: "list",
      columns: undefined,
      items: [
        { number: undefined, term: "Qaf (ق)", text: "pangkal lidah terangkat.", examples: [["أَقْرَبُ", "أُقْسِمُ"]] },
        { number: undefined, term: "Ya sukun setelah kasrah", text: "", examples: [["قِيلَ", "وَحِيلَ"]] },
        { number: undefined, term: "Bagian terdalam", text: "hamzah (ء) dan ha (هـ).", examples: [["يَأْكُلُ", "مُؤْمِنٌ"]] }
      ]
    });
  });

  it("names the columns of an example table", () => {
    const [, example, table] = parts(`Pengantar.
Contoh (nun sukun · tanwin):
• Lam: مِنْ لَدُنْهُ · هُدًى لِلْمُتَّقِينَ`);
    expect(example).toEqual({ kind: "lead", text: "Contoh" });
    expect(table).toMatchObject({ kind: "list", columns: ["nun sukun", "tanwin"], items: [{ term: "Lam", examples: [["مِنْ لَدُنْهُ"], ["هُدًى لِلْمُتَّقِينَ"]] }] });
  });

  it("marks steps after a forbidding lead", () => {
    const steps = parts(`Ada tiga cara yang dibolehkan:
① Semua dipisah: akhir surat – berhenti – awal surat.

Dan ada satu cara yang tidak boleh:
④ Akhir surat disambung dengan basmalah.`).filter((part): part is Extract<Part, { kind: "steps" }> => part.kind === "steps");

    expect(steps.map(({ forbidden, items }) => [forbidden, items.length])).toEqual([
      [false, 1],
      [true, 1]
    ]);
  });

  it("recognises notes, facts, symbols, verses and bare Arabic", () => {
    expect(
      parts(`Pengantar.
Penting: idgham hanya terjadi di dua kata.
Panjangnya 4 atau 5 harakat.
Hukum tajwid dibedakan menjadi dua sisi.
لا (lam alif): jangan berhenti di sini.
Contoh: وَالَّذِي جَاءَ بِالصِّدْقِ (Az-Zumar: 33)
صِفْ ذَا ثَنَا

Contoh:
• مِنَ الْجِنَّةِ وَالنَّاسِ
• فَأَتَمَّهُنَّ`).map((part) => part.kind)
    ).toEqual(["paragraph", "note", "fact", "paragraph", "symbols", "arabic", "lead", "examples"]);
  });

  it("nests points under the numbered item they follow", () => {
    const [, numbered] = parts(`Ra yang boleh dibaca tebal atau tipis:
1. Kata فِرْقٍ ketika bacaan disambung.
• Jika berhenti dengan sukun, ra dibaca tebal.`);

    expect(numbered).toMatchObject({ kind: "numbered", items: [{ number: "1", points: [{ text: "Jika berhenti dengan sukun, ra dibaca tebal." }] }] });
  });

  it("lays out every seeded tajwid lesson with its reference", () => {
    for (const lesson of lessons) {
      const layout = lessonLayout(lesson.content);
      expect(layout.source, lesson.slug).toMatch(/^Kitab/);
      expect(layout.sections.flatMap(({ parts }) => parts).length, lesson.slug).toBeGreaterThan(0);
    }
  });
});

describe("lesson layout helpers", () => {
  it("groups Arabic examples", () => {
    expect(exampleGroups("وَمَنْ يَعْمَلْ، مَنْ يَخْشَىٰ · لِقَوْمٍ يَتَفَكَّرُونَ.")).toEqual([["وَمَنْ يَعْمَلْ", "مَنْ يَخْشَىٰ"], ["لِقَوْمٍ يَتَفَكَّرُونَ"]]);
  });

  it("separates a quoted passage from its reference", () => {
    expect(verseParts("ذَٰلِكَ الْكِتَابُ (Al-Baqarah: 2)")).toEqual({ arabic: "ذَٰلِكَ الْكِتَابُ", reference: "Al-Baqarah: 2" });
    expect(verseParts("فَأَتَمَّهُنَّ")).toEqual({ arabic: "فَأَتَمَّهُنَّ", reference: null });
    expect(verseParts("Kata biasa (catatan)")).toBeNull();
  });

  it("flags Arabic runs inside Latin text", () => {
    expect(arabicRuns("Contoh: أَنْ تَقُولَ dan lainnya")).toEqual([
      { text: "Contoh: ", arabic: false },
      { text: "أَنْ تَقُولَ", arabic: true },
      { text: " dan lainnya", arabic: false }
    ]);
  });

  it("estimates reading time in whole minutes", () => {
    expect(readingMinutes("kata ".repeat(10))).toBe(1);
    expect(readingMinutes("kata ".repeat(540))).toBe(3);
  });
});

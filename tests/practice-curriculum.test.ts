import { describe, expect, it } from "vitest";
import { lessons as bagian2 } from "../src/data/praktik-bagian-2";
import { lessons as bagian3 } from "../src/data/praktik-bagian-3";
import { lessons as bagian4 } from "../src/data/praktik-bagian-4";
import { lessons as bagian1 } from "../src/data/praktik-dasar";
import { practiceSections, soundKey } from "../src/lib/lessons";
import { groupByPart, PRACTICE_TOTAL, practicePart, practiceParts } from "../src/lib/practice-curriculum";

describe("practice curriculum", () => {
  it("splits 39 practices into four parts of 7, 11, 11, and 10", () => {
    expect(practiceParts.map(({ from, to }) => [from, to])).toEqual([
      [1, 7],
      [8, 18],
      [19, 29],
      [30, 39]
    ]);
    expect(practiceParts.at(-1)?.to).toBe(PRACTICE_TOTAL);
    expect(practicePart(7).number).toBe(1);
    expect(practicePart(8).number).toBe(2);
    expect(practicePart(45).number).toBe(4);
  });

  it("groups published practices into parts, leaving later parts empty", () => {
    const groups = groupByPart(["a", "b", "c", "d", "e", "f", "g", "h"]);
    expect(groups.map(({ items }) => items.map(({ practice, number }) => `${number}${practice}`))).toEqual([
      ["1a", "2b", "3c", "4d", "5e", "6f", "7g"],
      ["8h"],
      [],
      []
    ]);
  });
});

const lessons = [...bagian1, ...bagian2, ...bagian3, ...bagian4];

describe("practices from the workbooks", () => {
  it("has all 39 practices of the four parts, in order", () => {
    expect(lessons.map(({ title }: { title: string }) => title)).toEqual([
      "Mengenal Huruf Hijaiyah",
      "Harakat Alif sampai Kho",
      "Harakat Dal sampai Shod",
      "Harakat Dhod sampai Qof",
      "Harakat Kaf sampai Ya",
      "Tanwin",
      "Harakat, Tanwin, dan Huruf Mirip",
      "Bentuk Huruf Sambung",
      "Kata Dua Huruf",
      "Kata Tiga Huruf Berfathah",
      "Kata Tiga Huruf Campuran Harakat",
      "Ta Marbuthah dan Hamzah",
      "Kata Empat Huruf dan Tanwin",
      "Mad Alif",
      "Mad Ya",
      "Mad Wawu",
      "Harakat Berdiri dan Alif Maqshurah",
      "Pendek atau Panjang",
      "Sukun",
      "Qalqalah",
      "Huruf Lin",
      "Tasydid",
      "Nun dan Mim Bertasydid",
      "Lam Qamariyah",
      "Lam Syamsiyah",
      "Lafzhul Jalalah",
      "Hamzah Washal",
      "Huruf yang Tidak Dibaca",
      "Ulangan Bagian 3",
      "Izhhar Halqi",
      "Idgham",
      "Iqlab",
      "Ikhfa",
      "Hukum Mim Sukun",
      "Mad Muttashil dan Munfashil",
      "Mad Lazim dan 'Aridh Lissukun",
      "Hukum Ra",
      "Waqaf di Akhir Ayat",
      "Ujian Membaca Mushaf"
    ]);
    expect(lessons).toHaveLength(PRACTICE_TOTAL);
    const positions = lessons.map(({ position }: { position: number }) => position);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(groupByPart(lessons).map(({ items }) => items.length)).toEqual([7, 11, 11, 10]);
  });

  it("gives every practice a guide and exercises A, B, C, the last one handed to the teacher", () => {
    for (const { title, content } of lessons as { title: string; content: string }[]) {
      const { guide, sections } = practiceSections(content);
      expect(guide.length, title).toBeGreaterThan(0);
      // Only the final exam has exercises read straight from the mushaf, with no drill rows.
      const drills = title === "Ujian Membaca Mushaf" ? sections.slice(0, 1) : sections;
      expect(drills.every(({ rows }) => rows.length > 0), title).toBe(true);
      expect(sections.map(({ label }) => label?.slice(0, 9)), title).toEqual(["Latihan A", "Latihan B", "Latihan C"]);
      expect(sections.at(-1)?.label, title).toMatch(/setor .*guru/i);
    }
  });

  it("keeps Bagian 2 free of sukun and tasydid", () => {
    for (const { title, content } of bagian2 as { title: string; content: string }[]) {
      expect(content, title).not.toMatch(/[ّْ]/);
    }
  });

  it("reads heavy letters with 'a', never 'o'", () => {
    for (const { content } of lessons as { content: string }[]) {
      for (const { label } of practiceSections(content).sections) {
        for (const { reading } of (label && soundKey(label)) || []) expect(reading).not.toMatch(/o/);
      }
      expect(content).not.toMatch(/terdengar "o"/);
    }
  });
});

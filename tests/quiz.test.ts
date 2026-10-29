import { describe, expect, it } from "vitest";
import { lessons as jazariyahLessons } from "../scripts/data/jazariyah.mjs";
import { lessons as tajwidLessons } from "../scripts/data/tajwid-pertemuan.mjs";
import { materiCategories } from "../src/lib/categories";
import { drawQuiz, parseScores, QUIZ_LENGTH, recordScore } from "../src/lib/quiz";
import { quizBanks } from "../src/lib/quiz-data";

const lessonSlugs = {
  tajwid: new Set(tajwidLessons.map(({ slug }: { slug: string }) => slug)),
  jazariyah: new Set(jazariyahLessons.map(({ slug }: { slug: string }) => slug))
};

describe("quiz banks", () => {
  for (const category of materiCategories) {
    const bank = quizBanks[category];

    it(`${category} has 50 well-formed questions`, () => {
      expect(bank).toHaveLength(50);
      expect(new Set(bank.map(({ question }) => question)).size).toBe(bank.length);

      for (const { question, options, explanation, lesson } of bank) {
        expect(new Set(options).size, question).toBe(4);
        expect(explanation.length, question).toBeGreaterThan(0);
        expect(lessonSlugs[category].has(lesson), `${question} → ${lesson}`).toBe(true);
      }
    });
  }
});

describe("drawQuiz", () => {
  const bank = quizBanks.tajwid;

  it("draws distinct questions and keeps track of the correct option", () => {
    const quiz = drawQuiz(bank);
    expect(quiz).toHaveLength(QUIZ_LENGTH);
    expect(new Set(quiz.map(({ question }) => question)).size).toBe(QUIZ_LENGTH);

    for (const item of quiz) {
      const original = bank.find(({ question }) => question === item.question)!;
      expect(item.options[item.answer]).toBe(original.options[0]);
      expect([...item.options].sort()).toEqual([...original.options].sort());
    }
  });
});

describe("quiz scores", () => {
  it("keeps the best score and counts attempts", () => {
    const first = recordScore({}, "tajwid", 7);
    const second = recordScore(first, "tajwid", 5);
    expect(second.tajwid).toEqual({ best: 7, last: 5, attempts: 2 });
  });

  it("tolerates corrupt saved values", () => {
    expect(parseScores(null)).toEqual({});
    expect(parseScores("not json")).toEqual({});
    expect(parseScores('{"tajwid":{"best":"x"},"jazariyah":{"best":9,"last":8,"attempts":3}}')).toEqual({
      jazariyah: { best: 9, last: 8, attempts: 3 }
    });
  });
});

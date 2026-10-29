import { describe, expect, it } from "vitest";
import { lessons as tajwidLessons } from "../src/data/tajwid-pertemuan";
import { materiCategories } from "../src/lib/categories";
import { drawQuiz, parseScores, QUIZ_LENGTH, recordScore } from "../src/lib/quiz";
import { quizBanks } from "../src/lib/quiz-data";

const lessonSlugs = {
  tajwid: new Set(tajwidLessons.map(({ slug }) => slug))
};

describe("quiz banks", () => {
  for (const category of materiCategories) {
    const bank = quizBanks[category];

    it(`${category} has well-formed questions`, () => {
      expect(bank.length).toBeGreaterThanOrEqual(QUIZ_LENGTH * 5);
      expect(new Set(bank.map(({ question }) => question)).size).toBe(bank.length);

      for (const { question, options, explanation, lesson } of bank) {
        expect(new Set(options).size, question).toBe(4);
        expect(explanation.length, question).toBeGreaterThan(0);
        expect(lessonSlugs[category].has(lesson), `${question} → ${lesson}`).toBe(true);
      }
    });
  }
});

describe("tajwid quiz coverage", () => {
  it("asks about every Lanjutan meeting except the teaching practice", () => {
    const asked = new Set(quizBanks.tajwid.map(({ lesson }) => lesson));
    const missing = tajwidLessons.map(({ slug }) => slug).filter((slug) => slug !== "praktik-mengajar" && !asked.has(slug));
    expect(missing).toEqual([]);
  });
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
    expect(parseScores('{"tajwid":{"best":"x"},"lain":{"best":9,"last":8,"attempts":3}}')).toEqual({
      lain: { best: 9, last: 8, attempts: 3 }
    });
  });
});

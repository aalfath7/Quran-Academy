// Dependency-free so the quiz page can run it in the browser; scores live in the viewer's localStorage.
import type { MateriCategory } from "./categories";

export const QUIZ_LENGTH = 10;
export const QUIZ_SCORES_KEY = "tes-pemahaman";

/** One multiple-choice question. The first option is the correct one; options are shuffled when shown. */
export type QuizQuestion = {
  question: string;
  options: [string, string, string, string];
  explanation: string;
  /** Slug of the lesson the question is drawn from, for "pelajari lagi". */
  lesson: string;
};

/** A question as shown: options in random order, with the correct one's position. */
export type QuizItem = Omit<QuizQuestion, "options"> & { options: string[]; answer: number };

export type QuizScore = { best: number; last: number; attempts: number };
export type QuizScores = Partial<Record<MateriCategory, QuizScore>>;

export const emptyScores: QuizScores = {};

export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** A fresh round: `length` distinct questions from the bank, each with its options shuffled. */
export function drawQuiz(bank: readonly QuizQuestion[], length = QUIZ_LENGTH, random = Math.random): QuizItem[] {
  return shuffle(bank, random)
    .slice(0, length)
    .map(({ options, ...question }) => {
      const order = shuffle(options.map((_, i) => i), random);
      return { ...question, options: order.map((i) => options[i]), answer: order.indexOf(0) };
    });
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;
const isCount = (value: unknown): value is number => Number.isInteger(value) && (value as number) >= 0;

/** Saved scores, tolerating missing, corrupt, or hand-edited values. */
export function parseScores(raw: string | null): QuizScores {
  if (!raw) return emptyScores;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return emptyScores;
  }
  if (!isRecord(value)) return emptyScores;

  return Object.fromEntries(
    Object.entries(value).flatMap(([category, score]) =>
      isRecord(score) && isCount(score.best) && isCount(score.last) && isCount(score.attempts)
        ? [[category, { best: score.best, last: score.last, attempts: score.attempts }]]
        : []
    )
  );
}

export function recordScore(scores: QuizScores, category: MateriCategory, correct: number): QuizScores {
  const previous = scores[category];

  return {
    ...scores,
    [category]: {
      best: Math.max(previous?.best ?? 0, correct),
      last: correct,
      attempts: (previous?.attempts ?? 0) + 1
    }
  };
}

import type { MateriCategory } from "../categories";
import type { QuizQuestion } from "../quiz";
import { tajwidQuiz } from "./tajwid";

export const quizBanks: Record<MateriCategory, QuizQuestion[]> = {
  tajwid: tajwidQuiz
};

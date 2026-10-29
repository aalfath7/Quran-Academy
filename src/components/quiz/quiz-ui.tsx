"use client";

import { ArrowRight, BookOpen, Check, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { MateriCategory } from "@/lib/categories";
import {
  drawQuiz,
  emptyScores,
  parseScores,
  QUIZ_LENGTH,
  QUIZ_SCORES_KEY,
  recordScore,
  type QuizItem,
  type QuizQuestion
} from "@/lib/quiz";
import { createLocalStore } from "../use-local-store";

const useQuizScores = createLocalStore(QUIZ_SCORES_KEY, parseScores, emptyScores);

/** Best and last score on a test card, once the viewer has taken it. */
export function QuizScoreBadge({ category }: { category: MateriCategory }) {
  const [scores] = useQuizScores();
  const score = scores[category];
  if (!score) return null;

  return (
    <span className="mt-4 block text-sm text-ink-soft">
      Nilai terbaik <strong className="font-semibold text-forest-deep">{score.best * 10}</strong> · terakhir {score.last * 10} ·{" "}
      {score.attempts}× mencoba
    </span>
  );
}

function verdict(correct: number) {
  if (correct === QUIZ_LENGTH) return "Sempurna! Semua jawaban benar.";
  if (correct >= 8) return "Bagus sekali, pemahamanmu sudah kuat.";
  if (correct >= 6) return "Cukup baik. Ulangi materi yang masih keliru.";
  return "Tetap semangat. Pelajari lagi materinya, lalu coba kembali.";
}

type Answer = { item: QuizItem; picked: number };

/** One round of ten questions drawn at random; a new round draws a new set. */
export function QuizRunner({ category, bank }: { category: MateriCategory; bank: QuizQuestion[] }) {
  const [, updateScores] = useQuizScores();
  // Drawn on click, never during render, so server and client markup always match.
  const [items, setItems] = useState<QuizItem[] | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [picked, setPicked] = useState<number | null>(null);

  function start() {
    setItems(drawQuiz(bank));
    setAnswers([]);
    setPicked(null);
  }

  if (!items) {
    return (
      <div className="mt-10 rounded-3xl border border-gold/30 bg-surface/60 p-8 text-center backdrop-blur">
        <p className="text-ink-soft">
          {QUIZ_LENGTH} soal pilihan ganda diambil acak dari {bank.length} soal. Setiap jawaban langsung diberi pembahasan.
        </p>
        <button
          type="button"
          onClick={start}
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-deep"
        >
          Mulai tes
          <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
        </button>
      </div>
    );
  }

  const finished = answers.length === items.length;

  if (finished) {
    const correct = answers.filter(({ item, picked }) => item.answer === picked).length;
    const wrong = answers.filter(({ item, picked }) => item.answer !== picked);

    return (
      <div className="mt-10 space-y-6">
        <div className="rounded-3xl border border-gold/30 bg-surface/60 p-8 text-center backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Hasil tes</p>
          <p className="mt-3 font-display text-6xl font-light text-forest-deep">{correct * 10}</p>
          <p className="mt-2 text-ink-soft">
            {correct} dari {items.length} jawaban benar. {verdict(correct)}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-deep"
            >
              <RotateCcw aria-hidden="true" size={16} /> Ulangi dengan soal baru
            </button>
            <Link
              href="/tes"
              className="inline-flex items-center rounded-full border border-forest/20 bg-surface/50 px-6 py-3 text-sm font-semibold text-forest-deep transition hover:border-forest/40 hover:bg-surface"
            >
              Pilih tes lain
            </Link>
          </div>
        </div>

        {wrong.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-light text-forest-deep">Yang perlu dipelajari lagi</h2>
            <ol className="mt-4 space-y-4">
              {wrong.map(({ item, picked }) => (
                <li key={item.question} className="rounded-2xl border border-forest/10 bg-surface/60 p-5">
                  <p className="font-medium text-forest-deep">{item.question}</p>
                  <p className="mt-2 text-sm text-ink-soft">
                    Jawabanmu: <span className="line-through">{item.options[picked]}</span>
                  </p>
                  <p className="mt-1 text-sm text-forest-deep">
                    Jawaban benar: <strong className="font-semibold">{item.options[item.answer]}</strong>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.explanation}</p>
                  <Link
                    href={`/lanjutan/${item.lesson}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline decoration-gold/50 decoration-2 underline-offset-4 transition hover:decoration-gold"
                  >
                    <BookOpen aria-hidden="true" size={14} /> Pelajari materinya
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }

  const index = answers.length;
  const item = items[index];
  const revealed = picked !== null;
  const isLast = index === items.length - 1;

  function next() {
    if (picked === null || !items) return;
    const all = [...answers, { item, picked }];
    setAnswers(all);
    setPicked(null);
    if (all.length === items.length) {
      updateScores((saved) => recordScore(saved, category, all.filter((a) => a.item.answer === a.picked).length));
    }
  }

  return (
    <div className="mt-10 rounded-3xl border border-gold/30 bg-surface/70 p-6 backdrop-blur md:p-8">
      <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        <span>
          Soal {index + 1} / {items.length}
        </span>
        <span className="text-ink-soft normal-case tracking-normal">
          {answers.filter((a) => a.item.answer === a.picked).length} benar
        </span>
      </div>
      <span
        role="progressbar"
        aria-label="Kemajuan tes"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={index}
        className="mt-3 block h-1.5 overflow-hidden rounded-full bg-forest/10"
      >
        <span className="block h-full rounded-full bg-gold transition-all" style={{ width: `${(index / items.length) * 100}%` }} />
      </span>

      <h2 className="mt-6 font-display text-2xl font-light leading-snug text-forest-deep">{item.question}</h2>

      <ul className="mt-6 space-y-3">
        {item.options.map((option, i) => {
          const isAnswer = i === item.answer;
          const isPicked = i === picked;
          const state = !revealed
            ? "border-forest/15 bg-paper/50 hover:border-gold/60 hover:bg-surface"
            : isAnswer
              ? "border-forest bg-forest/10"
              : isPicked
                ? "border-red-500/60 bg-red-500/10"
                : "border-forest/10 opacity-60";

          return (
            <li key={option}>
              <button
                type="button"
                disabled={revealed}
                onClick={() => setPicked(i)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-forest-deep transition ${state}`}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-forest/20 text-xs font-semibold">
                  {revealed && isAnswer ? (
                    <Check aria-hidden="true" size={14} strokeWidth={3} />
                  ) : revealed && isPicked ? (
                    <X aria-hidden="true" size={14} strokeWidth={3} />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="leading-7">{option}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {revealed && (
        <div className="mt-6 rounded-2xl bg-paper-deep/60 p-5" aria-live="polite">
          <p className={`font-semibold ${picked === item.answer ? "text-forest" : "text-red-600 dark:text-red-400"}`}>
            {picked === item.answer ? "Benar!" : "Belum tepat."}
          </p>
          <p className="mt-1 leading-7 text-ink-soft">{item.explanation}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <Link
              href={`/lanjutan/${item.lesson}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest underline decoration-gold/50 decoration-2 underline-offset-4 transition hover:decoration-gold"
            >
              <BookOpen aria-hidden="true" size={14} /> Buka materinya
            </Link>
            <button
              type="button"
              onClick={next}
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-brand-deep"
            >
              {isLast ? "Lihat hasil" : "Soal berikutnya"}
              <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

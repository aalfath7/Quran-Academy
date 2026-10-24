import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Lesson } from "@/db/schema";
import { categoryInfo, lessonHref } from "@/lib/categories";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const category = categoryInfo[lesson.category];

  return (
    <Link
      href={lessonHref(lesson)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-forest/10 bg-surface/60 p-7 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-surface hover:shadow-2xl hover:shadow-brand/10"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-forest/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
          {category.label}
        </span>
        <span className="font-arabic text-2xl text-gold/50 transition group-hover:text-gold" lang="ar" dir="rtl">
          {category.arabic}
        </span>
      </div>
      <h3 className="mt-6 font-display text-xl font-medium leading-snug text-forest-deep">{lesson.title}</h3>
      <p className="mt-3 line-clamp-3 flex-1 leading-7 text-ink-soft">{lesson.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
        Pelajari
        <ArrowUpRight aria-hidden="true" size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

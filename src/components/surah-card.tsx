import Link from "next/link";
import type { SurahSummary } from "@/lib/quran";
import { Star } from "./star";

export function SurahCard({ surah, href = `/quran/${surah.number}` }: { surah: SurahSummary; href?: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-5 rounded-3xl border border-forest/10 bg-surface/60 p-5 backdrop-blur transition duration-500 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-surface hover:shadow-xl hover:shadow-brand/10"
    >
      <span className="relative flex size-12 shrink-0 items-center justify-center text-gold">
        <Star className="absolute inset-0 size-12 transition-transform duration-700 group-hover:rotate-45" />
        <span className="relative font-display text-sm font-semibold">{surah.number}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-lg font-medium text-forest-deep">{surah.nameLatin}</span>
        <span className="block truncate text-sm text-ink-soft">
          {surah.translation} · {surah.ayahCount} ayat
        </span>
      </span>
      <span className="font-arabic text-2xl text-gold/70 transition group-hover:text-gold" lang="ar" dir="rtl">
        {surah.nameArabic}
      </span>
    </Link>
  );
}

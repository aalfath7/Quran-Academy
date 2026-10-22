import type { Metadata } from "next";
import Link from "next/link";
import { LessonCard } from "@/components/lesson-card";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { getDb } from "@/db";
import { categoryInfo, isLessonCategory, lessonCategories } from "@/lib/categories";
import { listPublishedLessons } from "@/lib/lessons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Materi Belajar · Quran Academy"
};

export default async function LearnPage({ searchParams }: { searchParams: Promise<{ kategori?: string }> }) {
  const { kategori } = await searchParams;
  const active = isLessonCategory(kategori) ? kategori : undefined;
  const lessons = await listPublishedLessons(await getDb(), active);

  const filters = [
    { href: "/belajar", label: "Semua", isActive: !active },
    ...lessonCategories.map((category) => ({
      href: `/belajar?kategori=${category}`,
      label: categoryInfo[category].label,
      isActive: active === category
    }))
  ];

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-6xl px-6 pb-12 pt-10 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Materi belajar</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.08] tracking-tight text-forest-deep md:text-6xl">
          {active ? (
            <>
              {categoryInfo[active].label}{" "}
              <span className="font-arabic text-4xl text-gold md:text-5xl" lang="ar" dir="rtl">
                {categoryInfo[active].arabic}
              </span>
            </>
          ) : (
            <>
              Pilih langkah <em className="italic text-gold">berikutnya.</em>
            </>
          )}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          {active
            ? categoryInfo[active].description
            : "Materi tilawah, tajwid, dan tahfidz yang disusun bertahap. Ambil satu, pelajari dengan tenang."}
        </p>

        <nav className="mt-10 flex flex-wrap gap-2" aria-label="Filter kategori">
          {filters.map(({ href, label, isActive }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-forest bg-forest text-paper"
                  : "border-forest/15 bg-white/50 text-forest-deep hover:border-forest/40"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        {lessons.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-[2.5rem] border border-dashed border-gold/40 bg-paper-deep/40 px-8 py-20 text-center">
            <Star className="size-14 text-gold/60" />
            <h2 className="mt-6 font-display text-2xl font-light text-forest-deep">Materi sedang disiapkan.</h2>
            <p className="mt-3 max-w-md text-ink-soft">
              Belum ada materi yang diterbitkan{active ? ` untuk ${categoryInfo[active].label}` : ""}. Silakan kembali lagi nanti.
            </p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

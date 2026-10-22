import { ArrowRight, BookOpenCheck, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { LessonCard } from "@/components/lesson-card";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { SurahCard } from "@/components/surah-card";
import { getDb } from "@/db";
import { categoryInfo, lessonCategories } from "@/lib/categories";
import { listLatestLessons } from "@/lib/lessons";
import { featuredSurahNumbers, listSurahsByNumber } from "@/lib/quran";

export const dynamic = "force-dynamic";

const highlights = [
  {
    icon: BookOpenCheck,
    title: "Belajar bertahap",
    description: "Bangun kebiasaan membaca dan memahami Al-Qur'an setahap demi setahap."
  },
  {
    icon: Sparkles,
    title: "Progres yang terarah",
    description: "Pantau perjalanan belajar dan tentukan target harian yang realistis."
  },
  {
    icon: Heart,
    title: "Untuk setiap langkah",
    description: "Ruang belajar yang nyaman untuk memulai, mengulang, dan bertumbuh."
  }
];

export default async function Home() {
  const db = await getDb();
  const [latestLessons, featuredSurahs] = await Promise.all([
    listLatestLessons(db, 3),
    listSurahsByNumber(db, featuredSurahNumbers)
  ]);

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-12 md:grid-cols-[1.1fr_0.9fr] md:pb-32 md:pt-20">
        <div className="rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="size-1.5 rounded-full bg-gold" />
            Langkah kecil, istiqamah
          </p>
          <h1 className="mt-7 max-w-2xl font-display text-5xl font-light leading-[1.05] tracking-tight text-forest-deep md:text-7xl">
            Dekat dengan Al-Qur&apos;an,{" "}
            <em className="font-normal italic text-gold">setiap hari.</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink-soft">
            Temukan pengalaman belajar yang membantu Anda membaca, memahami tajwid,
            dan menjaga hafalan dengan lebih terarah.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-semibold text-paper shadow-xl shadow-forest/20 transition hover:-translate-y-0.5 hover:bg-forest-deep"
              href="/belajar"
            >
              Mulai belajar
              <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              className="inline-flex items-center rounded-full border border-forest/20 bg-white/50 px-7 py-4 text-sm font-semibold text-forest-deep transition hover:-translate-y-0.5 hover:border-forest/40 hover:bg-white"
              href="/quran"
            >
              Baca Al-Qur&apos;an
            </Link>
          </div>
        </div>

        {/* Mihrab arch */}
        <div className="rise relative mx-auto w-full max-w-sm [animation-delay:150ms]">
          <Star className="spin-slow absolute -right-10 -top-10 size-36 text-gold/40" />
          <div className="relative rounded-t-full bg-forest p-3 shadow-2xl shadow-forest-deep/30">
            <div className="pattern-girih relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-t-full border border-gold-soft/40 px-8 pt-16 pb-10 text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/80 to-forest" />
              <div className="relative">
                <Star className="mx-auto size-10 text-gold-soft" />
                <p
                  className="mt-6 font-arabic text-3xl leading-[2] text-gold-soft"
                  lang="ar"
                  dir="rtl"
                >
                  وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِنْ مُدَّكِرٍ
                </p>
                <div className="mx-auto my-5 flex items-center justify-center gap-2">
                  <span className="h-px w-10 bg-gold-soft/50" />
                  <span className="size-1.5 rotate-45 bg-gold-soft/80" />
                  <span className="h-px w-10 bg-gold-soft/50" />
                </div>
                <p className="font-display text-sm italic leading-6 text-paper/80">
                  &ldquo;Dan sungguh, telah Kami mudahkan Al-Qur&apos;an untuk peringatan,
                  maka adakah orang yang mau mengambil pelajaran?&rdquo;
                </p>
                <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-soft/80">
                  QS. Al-Qamar · 54:17
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="pilar" className="relative border-y border-gold/20 bg-paper-deep/60">
        <div className="mx-auto grid max-w-6xl divide-y divide-gold/20 px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
          {lessonCategories.map((category) => {
            const { arabic, label, description } = categoryInfo[category];

            return (
              <Link
                key={category}
                href={`/belajar?kategori=${category}`}
                className="group flex items-center gap-5 py-8 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-arabic text-4xl text-gold" lang="ar" dir="rtl">
                  {arabic}
                </span>
                <div>
                  <p className="font-display text-lg font-medium text-forest-deep transition group-hover:text-gold">
                    {label}
                  </p>
                  <p className="text-sm text-ink-soft">{description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Al-Qur'an */}
      {featuredSurahs.length > 0 && (
        <section id="quran" className="relative mx-auto max-w-6xl px-6 pt-24 md:pt-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Al-Qur&apos;an</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight tracking-tight text-forest-deep md:text-5xl">
                Baca dan renungkan, <em className="italic text-gold">ayat demi ayat.</em>
              </h2>
              <p className="mt-5 text-ink-soft">
                114 surah dengan latin, terjemahan, dan tafsir Kementerian Agama RI. Mulai dari surah yang sering dibaca:
              </p>
            </div>
            <Link
              className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-forest underline decoration-gold/50 decoration-2 underline-offset-[6px] transition hover:decoration-gold md:self-auto"
              href="/quran"
            >
              Semua surah
              <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredSurahs.map((surah) => (
              <li key={surah.number}>
                <SurahCard surah={surah} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Features */}
      <section id="fitur" className="relative">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Perjalanan belajar</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight tracking-tight text-forest-deep md:text-5xl">
                Tumbuh dalam ilmu dan <em className="italic text-gold">kebiasaan baik.</em>
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft">
              Dirancang agar belajar terasa ringan, tenang, dan bisa dijalani setiap hari.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-forest/10 bg-white/60 p-8 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-2xl hover:shadow-forest/10"
              >
                <span className="absolute right-6 top-5 font-display text-6xl font-light text-gold/15 transition group-hover:text-gold/30">
                  0{index + 1}
                </span>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-forest text-gold-soft">
                  <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
                </span>
                <h3 className="mt-8 font-display text-xl font-medium text-forest-deep">{title}</h3>
                <p className="mt-3 leading-7 text-ink-soft">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest lessons */}
      {latestLessons.length > 0 && (
        <section className="relative mx-auto max-w-6xl px-6 pb-24 md:pb-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Materi terbaru</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight tracking-tight text-forest-deep">
                Mulai dari sini.
              </h2>
            </div>
            <Link
              className="hidden text-sm font-semibold text-forest underline decoration-gold/50 decoration-2 underline-offset-[6px] transition hover:decoration-gold md:inline"
              href="/belajar"
            >
              Semua materi
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {latestLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="mulai" className="relative mx-auto max-w-6xl px-6 pb-20">
        <div className="pattern-girih relative overflow-hidden rounded-[2.5rem] bg-forest-deep px-8 py-16 text-center md:py-20">
          <div className="absolute inset-0 bg-radial from-forest/60 to-forest-deep" />
          <div className="relative">
            <p className="font-arabic text-3xl text-gold-soft" lang="ar" dir="rtl">
              بِسْمِ اللَّهِ
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-light leading-tight text-paper md:text-5xl">
              Mulailah hari ini, <em className="italic text-gold-soft">walau satu ayat.</em>
            </h2>
            <Link
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold-soft px-7 py-4 text-sm font-semibold text-forest-deep transition hover:-translate-y-0.5 hover:bg-paper"
              href="/belajar"
            >
              Mulai belajar
              <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

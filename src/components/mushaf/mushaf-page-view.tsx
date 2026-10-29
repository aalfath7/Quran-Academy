import { QuranText } from "@/components/quran-text";
import { Star } from "@/components/star";
import { groupBySurah, toArabicDigits } from "@/lib/mushaf";
import { showsBismillah, type PageAyah } from "@/lib/quran";

/** Latin names of the surahs on a page, in order: "Al-Fātiḥah", "An-Nās · Al-Falaq". */
export const surahNames = (ayahs: PageAyah[]) => groupBySurah(ayahs).map(({ ayahs: [first] }) => first.nameLatin);

function AyahMarker({ ayah }: { ayah: PageAyah }) {
  return (
    <span
      title={`${ayah.nameLatin} ${ayah.surahNumber}:${ayah.number}`}
      aria-label={`Ayat ${ayah.number}`}
      className="relative mx-[0.15em] inline-flex size-[1.3em] items-center justify-center align-middle text-gold"
    >
      <Star className="absolute inset-0 size-full" />
      <span className="relative font-sans text-[0.4em] font-bold leading-none">{toArabicDigits(ayah.number)}</span>
    </span>
  );
}

function SurahOpening({ ayah }: { ayah: PageAyah }) {
  return (
    <header className="my-2 text-center">
      <div className="pattern-girih relative overflow-hidden rounded-2xl border border-gold/50 bg-brand-deep px-4 py-3">
        <div className="absolute inset-0 bg-radial from-brand/40 to-brand-deep" />
        <p className="relative font-arabic text-[calc(var(--mushaf-size,2rem)*0.8)] leading-[1.7] text-gold-soft" lang="ar" dir="rtl">
          سُورَةُ {ayah.nameArabic}
        </p>
        <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-soft/70">
          {ayah.nameLatin} · {ayah.ayahCount} ayat · {ayah.location}
        </p>
      </div>
      {showsBismillah(ayah.surahNumber) && (
        <p className="mt-3 font-arabic text-[calc(var(--mushaf-size,2rem)*0.9)] leading-loose text-forest-deep" lang="ar" dir="rtl">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
      )}
    </header>
  );
}

/** One printed mushaf page: its frame, juz and surah names, the ayahs line by line, and the page number. */
export function MushafPageView({ page, ayahs, className = "" }: { page: number; ayahs: PageAyah[]; className?: string }) {
  const juz = [...new Set(ayahs.map((ayah) => ayah.juz))];

  return (
    <article
      aria-label={`Halaman ${page}`}
      className={`rounded-4xl border-2 border-gold/40 bg-surface/80 p-1.5 shadow-xl shadow-brand/5 backdrop-blur ${className}`}
    >
      <div className="rounded-[1.6rem] border border-gold/25 px-4 py-4 sm:px-8 sm:py-6">
        <div className="flex items-center justify-between gap-4 border-b border-gold/25 pb-2 text-xs font-semibold text-gold">
          <span>Juz {juz.join("–")}</span>
          <span className="truncate text-right">{surahNames(ayahs).join(" · ")}</span>
        </div>

        <div className="mt-4 text-[calc(var(--mushaf-size,2rem)*0.8)] sm:text-(length:--mushaf-size,2rem)">
          {groupBySurah(ayahs).map(({ surahNumber, ayahs: run }) => (
            <section key={surahNumber}>
              {run[0].number === 1 && <SurahOpening ayah={run[0]} />}
              {/* A rule under every line: the background repeats once per line, so it follows the reading size. */}
              <p
                className="bg-[linear-gradient(to_bottom,transparent_calc(100%-1px),color-mix(in_srgb,var(--color-gold)_35%,transparent)_calc(100%-1px))] bg-size-[100%_2.25em] text-justify font-arabic leading-[2.25] text-forest-deep [text-align-last:center]"
                lang="ar"
                dir="rtl"
              >
                {run.map((ayah) => (
                  <span key={ayah.id} id={`ayat-${ayah.surahNumber}-${ayah.number}`} className="rounded-lg transition-colors hover:bg-gold/10">
                    <QuranText text={ayah.arabic} />
                    <AyahMarker ayah={ayah} />{" "}
                  </span>
                ))}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold/30" />
          <span className="font-arabic text-lg" lang="ar">
            {toArabicDigits(page)}
          </span>
          <span className="h-px w-10 bg-gold/30" />
        </div>
      </div>
    </article>
  );
}

import { ArrowRight, BookOpen, BookOpenText, Check, ChevronDown, ClipboardCheck, Ear, Mic, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { CLASS_PRICE, teacher } from "@/lib/class-offer";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { MEETING_TOTAL, tajwidStages } from "@/lib/tajwid-curriculum";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/apple-icon.png"),
      description: SITE_DESCRIPTION
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "id-ID",
      publisher: { "@id": `${SITE_URL}/#organization` }
    }
  ]
};

const stats = [`${MEETING_TOTAL} materi bertahap`, "130 ayat latihan", "Koreksi bacaan dari pengajar"];

const steps = [
  { title: "Pahami", description: "Baca penjelasan singkat: apa hukumnya, hurufnya apa saja, dan cara membacanya." },
  { title: "Dengar & tirukan", description: "Putar contoh bacaan pada 5 ayat pilihan, lalu ulangi sampai mirip." },
  {
    title: "Praktik di mushaf",
    description: "Baca satu halaman mushaf yang penuh dengan hukum tersebut. Tandai sendiri di mana hukumnya muncul."
  },
  {
    title: "Rekam & dikoreksi",
    description: "Kirim rekaman bacaanmu. Pengajar menunjukkan 2–3 bagian yang perlu diperbaiki dan latihan berikutnya."
  }
];

const features = [
  {
    icon: BookOpen,
    title: "Materi singkat",
    description: "Satu hukum per materi, dijelaskan dengan bahasa sederhana. Cukup 5 menit dibaca, sisanya untuk praktik."
  },
  {
    icon: Ear,
    title: "Latihan ayat",
    description: "5 ayat pilihan di setiap materi, lengkap dengan bagian yang perlu diperhatikan dan hukumnya."
  },
  {
    icon: BookOpenText,
    title: "Halaman praktik mushaf",
    description: "Satu halaman mushaf per materi yang paling banyak memuat hukum tersebut, agar latihan terasa seperti membaca sungguhan."
  },
  {
    icon: ClipboardCheck,
    title: "Tes pemahaman tajwid",
    description: "Uji pemahamanmu di menu Tes. Setiap materi dan tahap punya tes sendiri, lengkap dengan pembahasan jawabannya."
  },
  { icon: Mic, title: "Rekam bacaan", description: "Rekam langsung dari HP atau laptop dan kirim untuk dikoreksi pengajar." },
  {
    icon: TrendingUp,
    title: "Progres belajar",
    description: "Lihat materi yang sudah selesai, nilai evaluasi tiap tahap, dan riwayat koreksi bacaanmu."
  }
];

/** What each tajwid stage teaches, in stage order; the meeting counts come from the curriculum. */
const stageOutcomes = [
  { title: "Makhraj & sifat", outcome: "Huruf keluar dari tempat yang benar, tidak tertukar dengan huruf yang mirip" },
  { title: "Nun & mim sukun", outcome: "Izhar, idgham, iqlab, ikhfa, dan dengung yang konsisten" },
  { title: "Mad", outcome: "Panjang-pendek bacaan yang stabil: 2, 4–5, dan 6 harakat" },
  { title: "Tebal-tipis", outcome: "Qalqalah, huruf tebal, hukum ra dan lam" },
  { title: "Waqaf & ibtida", outcome: "Berhenti dan memulai di tempat yang benar, isti'adzah, basmalah, bacaan khusus" }
];

const plans = [
  {
    name: "Belajar Mandiri",
    price: "Gratis",
    items: [`Semua ${MEETING_TOTAL} materi tajwid`, "Latihan ayat dan halaman praktik mushaf", "Tes pemahaman tajwid di menu Tes", "Catatan progres belajar"],
    cta: "Mulai Gratis",
    href: "/praktik"
  },
  {
    name: "Kelas",
    price: CLASS_PRICE,
    period: "/ bulan",
    label: "Paling lengkap",
    featured: true,
    items: [
      "Semua fitur Belajar Mandiri",
      "4 pertemuan online per bulan, 60 menit, maksimal 5 murid",
      "Membaca dan dikoreksi langsung setiap pertemuan",
      "Evaluasi di akhir setiap tahap"
    ],
    cta: "Daftar Kelas",
    href: "/daftar?paket=kelas"
  },
  {
    name: "Koreksi Rekaman",
    price: "Rp50.000",
    period: "/ bulan",
    label: "Belajar dari rumah, kapan saja",
    items: [
      "Semua fitur Belajar Mandiri",
      "4 rekaman per bulan, masing-masing maksimal 2 menit",
      "Koreksi suara atau tulisan dari pengajar",
      "2–3 perbaikan terpenting dan saran latihan berikutnya"
    ],
    cta: "Mulai Kirim Rekaman",
    href: "/daftar?paket=rekaman"
  }
];

const faqs = [
  {
    question: "Apakah benar gratis?",
    answer:
      "Ya. Semua materi, latihan ayat, halaman mushaf, dan tes pemahaman tajwid bisa dipakai tanpa biaya. Yang berbayar hanya bimbingan dari pengajar: kelas dan koreksi rekaman."
  },
  {
    question: "Saya belum bisa membaca Al-Qur'an, bisa ikut?",
    answer: "Materi tajwid ditujukan untuk yang sudah bisa membaca. Jika belum, mulai dari kelas Ibtida'."
  },
  {
    question: "Apa bedanya belajar mandiri dengan koreksi rekaman?",
    answer:
      "Belajar mandiri membantu kamu tahu aturannya dan berlatih. Koreksi rekaman memastikan bacaanmu benar, karena kesalahan bacaan sering tidak terdengar oleh diri sendiri."
  },
  {
    question: "Mushaf apa yang dipakai?",
    answer: "Mushaf pojok 15 baris (604 halaman), agar nomor halaman latihan sama."
  }
];

const sectionLabel = "text-xs font-semibold uppercase tracking-[0.22em] text-gold";
const sectionTitle = "mt-4 font-display text-4xl font-light leading-tight tracking-tight text-forest-deep md:text-5xl";
const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-deep";

export default function Home() {
  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <JsonLd data={siteJsonLd} />
      <BackgroundGlow />
      <SiteHeader />

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-12 md:grid-cols-[1.1fr_0.9fr] md:pb-32 md:pt-20">
        <div className="rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-surface/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="size-1.5 rounded-full bg-gold" />
            Platform belajar tajwid · Gratis untuk mulai
          </p>
          <h1 className="mt-7 max-w-2xl font-display text-5xl font-light leading-[1.05] tracking-tight text-forest-deep md:text-6xl">
            Belajar tajwid dengan mudah, <em className="font-normal italic text-gold">langsung praktik di ayatnya.</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink-soft">
            Materi singkat per hukum, lalu latihan di ayat dan halaman mushaf pilihan. Rekam bacaanmu dan dapatkan koreksi dari pengajar.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link className={primaryButton} href="/praktik">
              Mulai Belajar Gratis
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link
              className="inline-flex items-center rounded-full border border-forest/20 bg-surface/50 px-7 py-4 text-sm font-semibold text-forest-deep transition hover:-translate-y-0.5 hover:border-forest/40 hover:bg-surface"
              href="#materi"
            >
              Lihat Materi
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-soft">
            {stats.map((stat) => (
              <li key={stat} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
                {stat}
              </li>
            ))}
          </ul>
        </div>

        {/* Mihrab arch */}
        <div className="rise relative mx-auto w-full max-w-sm [animation-delay:150ms]">
          <Star className="spin-slow absolute -right-10 -top-10 size-36 text-gold/40" />
          <div className="relative rounded-t-full bg-brand p-3 shadow-2xl shadow-brand-deep/30">
            <div className="pattern-girih relative flex aspect-3/4 flex-col items-center justify-center overflow-hidden rounded-t-full border border-gold-soft/40 px-8 pt-16 pb-10 text-center">
              <div className="absolute inset-0 bg-linear-to-b from-brand/40 via-brand/80 to-brand" />
              <div className="relative">
                <Star className="mx-auto size-10 text-gold-soft" />
                <p className="mt-6 font-arabic text-3xl leading-loose text-gold-soft" lang="ar" dir="rtl">
                  وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
                </p>
                <div className="mx-auto my-5 flex items-center justify-center gap-2">
                  <span className="h-px w-10 bg-gold-soft/50" />
                  <span className="size-1.5 rotate-45 bg-gold-soft/80" />
                  <span className="h-px w-10 bg-gold-soft/50" />
                </div>
                <p className="font-display text-sm italic leading-6 text-cream/80">
                  &ldquo;Dan bacalah Al-Qur&apos;an itu dengan tartil.&rdquo;
                </p>
                <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-soft/80">QS. Al-Muzzammil · 73:4</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="cara-kerja" className="relative border-y border-gold/20 bg-paper-deep/60">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="max-w-2xl">
            <p className={sectionLabel}>Cara kerja</p>
            <h2 className={sectionTitle}>
              Satu hukum, <em className="italic text-gold">empat langkah.</em>
            </h2>
            <p className="mt-5 text-ink-soft">Setiap materi dirancang agar kamu lebih banyak membaca daripada menghafal teori.</p>
          </div>
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ title, description }, index) => (
              <li key={title} className="relative rounded-3xl border border-forest/10 bg-surface/70 p-7">
                <span className="relative flex size-12 items-center justify-center text-gold">
                  <Star className="absolute inset-0 size-12" />
                  <span className="relative font-display text-sm font-semibold">{index + 1}</span>
                </span>
                <h3 className="mt-6 font-display text-xl font-medium text-forest-deep">{title}</h3>
                <p className="mt-3 leading-7 text-ink-soft">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className={sectionLabel}>Fitur</p>
          <h2 className={sectionTitle}>
            Semua yang kamu butuhkan <em className="italic text-gold">untuk berlatih.</em>
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-3xl border border-forest/10 bg-surface/60 p-8 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-surface hover:shadow-2xl hover:shadow-brand/10"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-gold-soft">
                <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
              </span>
              <h3 className="mt-8 font-display text-xl font-medium text-forest-deep">{title}</h3>
              <p className="mt-3 leading-7 text-ink-soft">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Materi */}
      <section id="materi" className="relative scroll-mt-8 border-y border-gold/20 bg-paper-deep/60">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className={sectionLabel}>Materi</p>
              <h2 className={sectionTitle}>
                {MEETING_TOTAL} materi, {tajwidStages.length} tahap, <em className="italic text-gold">dari makhraj sampai waqaf.</em>
              </h2>
              <p className="mt-5 text-ink-soft">Untuk kamu yang sudah bisa membaca Al-Qur&apos;an dan ingin bacaannya lebih benar.</p>
            </div>
            <Link
              className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-forest underline decoration-gold/50 decoration-2 underline-offset-[6px] transition hover:decoration-gold md:self-auto"
              href="/belajar"
            >
              Semua materi
              <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>

          <ol className="mt-12 divide-y divide-gold/20 overflow-hidden rounded-3xl border border-gold/25 bg-surface/70">
            {tajwidStages.map((stage, i) => (
              <li key={stage.number} className="grid gap-2 px-6 py-5 md:grid-cols-[16rem_7rem_1fr] md:items-center md:gap-6 md:px-8">
                <p className="flex items-center gap-3 font-display text-lg text-forest-deep">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand font-sans text-xs font-semibold text-cream">
                    {stage.number}
                  </span>
                  {stageOutcomes[i]?.title ?? stage.title}
                </p>
                <p className="text-sm font-semibold text-gold">{stage.to - stage.from + 1} materi</p>
                <p className="leading-7 text-ink-soft">{stageOutcomes[i]?.outcome}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm leading-6 text-ink-soft">
            Setiap tahap ditutup dengan evaluasi bacaan 1 halaman mushaf. Belum bisa membaca?{" "}
            <Link href="/praktik" className="font-semibold text-forest underline decoration-gold/50 underline-offset-4 hover:decoration-gold">
              Kelas Ibtida&apos;
            </Link>{" "}
            mengajarkan dari mengenal huruf.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="harga" className="relative mx-auto max-w-6xl scroll-mt-8 px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className={sectionLabel}>Harga</p>
          <h2 className={sectionTitle}>
            Mulai gratis, <em className="italic text-gold">tambah bimbingan saat kamu siap.</em>
          </h2>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map(({ name, price, period, label, featured, items, cta, href }) => (
            <article
              key={name}
              className={`flex flex-col rounded-3xl border p-8 ${
                featured ? "border-brand bg-brand-deep text-cream shadow-2xl shadow-brand/20" : "border-forest/10 bg-surface/60 backdrop-blur"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className={`font-display text-xl font-medium ${featured ? "text-cream" : "text-forest-deep"}`}>{name}</h3>
                {label && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${featured ? "bg-gold-soft text-brand-deep" : "bg-gold/15 text-gold"}`}
                  >
                    {label}
                  </span>
                )}
              </div>
              <p className={`mt-6 font-display text-4xl font-light ${featured ? "text-cream" : "text-forest-deep"}`}>
                {price}
                {period && <span className={`text-base ${featured ? "text-cream/70" : "text-ink-soft"}`}> {period}</span>}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {items.map((item) => (
                  <li key={item} className={`flex gap-3 leading-6 ${featured ? "text-cream/85" : "text-ink-soft"}`}>
                    <Check aria-hidden="true" size={18} className={`mt-0.5 shrink-0 ${featured ? "text-gold-soft" : "text-gold"}`} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  featured ? "bg-gold-soft text-brand-deep hover:bg-cream" : "border border-forest/20 text-forest-deep hover:border-forest/40 hover:bg-surface"
                }`}
              >
                {cta}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-ink-soft">
          Pembayaran per bulan, bisa berhenti kapan saja. Kelas ikhwan dibuka; kelas akhwat segera hadir.
        </p>
      </section>

      {/* Teacher */}
      <section id="pengajar" className="relative mx-auto max-w-4xl px-6 pb-24 md:pb-28">
        <div className="pattern-girih relative overflow-hidden rounded-[2rem] bg-brand-deep px-6 py-6 md:px-8">
          <div className="absolute inset-0 bg-radial from-brand/50 to-brand-deep" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <Image
              src={teacher.photo}
              alt={`Foto ${teacher.name}`}
              width={160}
              height={160}
              unoptimized
              className="size-20 shrink-0 rounded-full border-2 border-gold-soft/60 bg-cream object-cover"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft/80">Pengajar</p>
              <h2 className="mt-1 font-display text-xl font-light leading-snug text-cream md:text-2xl">
                Dibuat dan dikoreksi oleh pengajar <span className="whitespace-nowrap">Al-Qur&apos;an</span>
              </h2>
              <p className="mt-2 text-sm leading-6 text-cream/80">
                Disusun oleh <span className="font-semibold text-cream">{teacher.name}</span>. Fathway dibangun agar belajar tajwid yang benar
                dan terbimbing bisa dilakukan dari mana saja.
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {teacher.credentials.map((line) => (
                  <li key={line} className="rounded-full border border-gold-soft/30 bg-cream/10 px-3 py-1 text-xs text-cream/90">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative mx-auto max-w-3xl px-6 pb-24 md:pb-32">
        <p className={sectionLabel}>FAQ</p>
        <h2 className={sectionTitle}>Pertanyaan yang sering ditanyakan</h2>
        <div className="mt-10 divide-y divide-gold/20 rounded-3xl border border-gold/25 bg-surface/60">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group px-6 py-5 md:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-forest-deep [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown aria-hidden="true" size={18} className="shrink-0 text-gold transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-7 text-ink-soft">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section id="mulai" className="relative mx-auto max-w-6xl px-6 pb-20">
        <div className="pattern-girih relative overflow-hidden rounded-[2.5rem] bg-brand-deep px-8 py-16 text-center md:py-20">
          <div className="absolute inset-0 bg-radial from-brand/60 to-brand-deep" />
          <div className="relative">
            <p className="font-arabic text-3xl text-gold-soft" lang="ar" dir="rtl">
              بِسْمِ اللَّهِ
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-light leading-tight text-cream md:text-5xl">
              Bacaan yang benar dimulai dari <em className="italic text-gold-soft">satu ayat hari ini.</em>
            </h2>
            <Link
              href="/praktik"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold-soft px-7 py-4 text-sm font-semibold text-brand-deep transition hover:-translate-y-0.5 hover:bg-cream"
            >
              Mulai Belajar Gratis
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

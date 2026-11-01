import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  ADMIN_WHATSAPP,
  ADMIN_WHATSAPP_LABEL,
  CLASS_NAME,
  CLASS_PRICE,
  CLASS_START_LABEL,
  classFacts,
  classSchedules,
  CURRENT_WAVE,
  REGISTRATION_DEADLINE_LABEL,
  teacher
} from "@/lib/class-offer";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = pageMetadata({
  title: `Daftar ${CLASS_NAME}`,
  description: `Sudah bisa membaca, tapi belum yakin bacaanmu benar? Baca langsung, dikoreksi satu per satu via Google Meet. Khusus ikhwan, ${CLASS_PRICE}/bulan.`,
  path: "/daftar"
});

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: CLASS_NAME,
  description: "Kelas online perbaikan bacaan Al-Quran: baca langsung dan dikoreksi satu per satu.",
  inLanguage: "id-ID",
  provider: { "@type": "EducationalOrganization", name: SITE_NAME, url: SITE_URL },
  offers: { "@type": "Offer", category: "Paid", price: CLASS_PRICE.replace(/\D/g, ""), priceCurrency: "IDR" },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseSchedule: { "@type": "Schedule", repeatFrequency: "P1W", repeatCount: 4 },
    instructor: { "@type": "Person", name: teacher.name }
  }
};

export default function RegisterPage() {
  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <JsonLd data={courseJsonLd} />
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-6xl px-6 pb-12 pt-10 md:pt-16">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream">Khusus ikhwan</span>
          <span className="rounded-full bg-gold-soft/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a5a1f] dark:bg-gold-soft/15 dark:text-gold-soft">
            Gelombang {CURRENT_WAVE}
          </span>
        </div>
        <h1 className="mt-8 max-w-3xl font-display text-5xl font-light leading-[1.08] tracking-tight text-forest-deep md:text-6xl">
          Kelas Perbaikan{" "}
          <em className="italic text-gold">
            Bacaan <span className="whitespace-nowrap">Al-Quran.</span>
          </em>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          Sudah bisa membaca, tapi belum yakin bacaanmu benar? Baca langsung, dikoreksi satu per satu.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-forest/10 bg-surface/60 p-7 backdrop-blur">
            <h2 className="font-display text-2xl font-medium text-forest-deep">Pilih jadwalmu</h2>
            <ul className="mt-5 space-y-3">
              {classSchedules.map(({ id, day, time }) => (
                <li key={id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-2xl bg-forest/5 px-5 py-4">
                  <span className="font-semibold text-forest">{day}</span>
                  <span className="text-sm font-medium text-forest-deep">{time}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid gap-x-6 gap-y-2 border-t border-gold/20 pt-5 text-sm text-ink-soft sm:grid-cols-2">
              {classFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-forest/10 bg-surface/60 p-7 backdrop-blur">
            <Image
              src={teacher.photo}
              alt={`Foto ${teacher.name}`}
              width={160}
              height={160}
              unoptimized
              className="size-24 rounded-full border-2 border-gold-soft/60 bg-cream object-cover"
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Pengajar</p>
            <p className="mt-1 font-display text-xl font-medium text-forest-deep">{teacher.name}</p>
            {teacher.credentials.map((line) => (
              <p key={line} className="mt-1 text-sm text-ink-soft">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="pattern-girih relative mt-5 overflow-hidden rounded-4xl bg-brand-deep p-7 md:p-10">
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-display text-4xl font-light text-cream">
                {CLASS_PRICE}
                <span className="text-base text-cream/70"> /bulan</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-cream/80">
                Pendaftaran ditutup {REGISTRATION_DEADLINE_LABEL}
                <br />
                Kelas mulai {CLASS_START_LABEL}
              </p>
            </div>
            <a
              href="#form-daftar"
              className="inline-block w-fit rounded-full bg-cream px-6 py-3 text-sm font-semibold text-brand-deep transition hover:bg-gold-soft"
            >
              Daftar sekarang
            </a>
          </div>
        </div>
      </section>

      <section id="form-daftar" className="relative mx-auto max-w-3xl scroll-mt-8 px-6 pb-24">
        <h2 className="font-display text-3xl font-light text-forest-deep md:text-4xl">Formulir pendaftaran</h2>
        <p className="mb-8 mt-3 leading-7 text-ink-soft">
          Isi data di bawah, lalu kirim pesan yang sudah disiapkan lewat WhatsApp. Belum bisa membaca Al-Quran?{" "}
          <Link href="/pemula" className="font-semibold text-forest underline decoration-gold/50 underline-offset-4 hover:decoration-gold">
            Mulai dari kelas Pemula
          </Link>
          .
        </p>
        <RegistrationForm />
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <MessageCircle aria-hidden="true" size={16} />
          Ada pertanyaan?{" "}
          <a
            href={`https://wa.me/${ADMIN_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-forest underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
          >
            WA {ADMIN_WHATSAPP_LABEL}
          </a>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

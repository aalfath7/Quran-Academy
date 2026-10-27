import type { Metadata } from "next";
import Image from "next/image";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { CLASS_PRICE, classFacts, classIds, classInfo, CURRENT_WAVE, teacher } from "@/lib/class-offer";
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
  title: "Daftar Kelas Online · Fathway Quran",
  description: "Kelas Tahsin, Tajwid, atau Tahfidz online via Google Meet. Kelas kecil, maksimal 5 murid, khusus ikhwan."
};

export default function RegisterPage() {
  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-6xl px-6 pb-12 pt-10 md:pt-16">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream">
            Khusus ikhwan
          </span>
          <span className="rounded-full bg-gold-soft/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a5a1f] dark:bg-gold-soft/15 dark:text-gold-soft">
            Gelombang {CURRENT_WAVE}
          </span>
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Pendaftaran dibuka</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.08] tracking-tight text-forest-deep md:text-6xl">
          Belajar Al-Quran <em className="italic text-gold">online.</em>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          Kelas kecil berisi materi, praktik langsung, dan koreksi satu per satu.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {classIds.map((id) => {
            const { label, description, day, time } = classInfo[id];
            return (
              <article key={id} className="flex flex-col rounded-3xl border border-forest/10 bg-surface/60 p-7 backdrop-blur">
                <h2 className="font-display text-2xl font-medium text-forest-deep">{label}</h2>
                <p className="mt-3 flex-1 leading-7 text-ink-soft">{description}</p>
                <p className="mt-5 text-sm font-semibold text-forest">
                  {day}
                  <br />
                  {time}
                </p>
              </article>
            );
          })}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {classFacts.map((fact) => (
            <li key={fact} className="rounded-full bg-forest/5 px-4 py-2 text-sm font-medium text-forest">
              {fact}
            </li>
          ))}
          <li className="rounded-full bg-gold-soft/40 px-4 py-2 text-sm font-medium text-[#7a5a1f] dark:bg-gold-soft/15 dark:text-gold-soft">
            Materi & latihan di platform Fathway Quran
          </li>
        </ul>

        <div className="pattern-girih relative mt-10 overflow-hidden rounded-[2rem] bg-brand-deep p-7 md:p-10">
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <Image
                src={teacher.photo}
                alt={`Foto ${teacher.name}`}
                width={160}
                height={160}
                unoptimized
                className="size-20 shrink-0 rounded-full border-2 border-gold-soft/60 bg-cream object-cover md:size-24"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft/80">Pengajar</p>
                <p className="mt-1 font-display text-xl font-medium text-cream md:text-2xl">{teacher.name}</p>
                {teacher.credentials.map((line) => (
                  <p key={line} className="text-sm text-cream/75">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="md:text-right">
              <p className="font-display text-4xl font-light text-cream">
                {CLASS_PRICE}
                <span className="text-base text-cream/70"> /bulan</span>
              </p>
              <a
                href="#form-daftar"
                className="mt-4 inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-brand-deep transition hover:bg-gold-soft"
              >
                Daftar sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="form-daftar" className="relative mx-auto max-w-3xl scroll-mt-8 px-6 pb-24">
        <h2 className="font-display text-3xl font-light text-forest-deep md:text-4xl">Formulir pendaftaran</h2>
        <p className="mb-8 mt-3 text-ink-soft">Isi data di bawah. Kami akan menghubungimu lewat WhatsApp untuk konfirmasi.</p>
        <RegistrationForm />
      </section>

      <SiteFooter />
    </main>
  );
}

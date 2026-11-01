"use client";

import { CircleCheck, MessageCircle } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState, useSyncExternalStore } from "react";
import {
  ADMIN_WHATSAPP,
  ADMIN_WHATSAPP_LABEL,
  classSchedules,
  CURRENT_WAVE,
  isRegistrationOpen,
  MIN_AGE,
  readingLevels,
  registrationLink,
  type RegistrationErrors,
  validateRegistration
} from "@/lib/class-offer";

const inputClass =
  "mt-2 w-full rounded-2xl border border-forest/15 bg-surface/70 px-4 py-3 text-ink outline-none transition placeholder:text-ink-soft/40 focus:border-gold focus:bg-surface focus:ring-4 focus:ring-gold-soft/30 aria-invalid:border-red-700/50";
const whatsappButton =
  "mt-6 flex w-fit items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-deep";

const subscribeToNothing = () => () => {};

function FieldError({ error, hint }: { error?: string; hint?: string }) {
  return error ? (
    <span className="mt-1.5 block text-xs text-red-800 dark:text-red-300">{error}</span>
  ) : (
    hint && <span className="mt-1.5 block text-xs text-ink-soft/70">{hint}</span>
  );
}

function RegistrationClosed() {
  return (
    <div role="status" className="rounded-4xl border border-gold/30 bg-surface/70 px-6 py-12 text-center">
      <h3 className="font-display text-3xl font-light text-forest-deep">Pendaftaran gelombang {CURRENT_WAVE} sudah ditutup</h3>
      <p className="mx-auto mt-3 max-w-md leading-7 text-ink-soft">
        Ingin ikut gelombang berikutnya? Kabari kami lewat WhatsApp di {ADMIN_WHATSAPP_LABEL}.
      </p>
      <a href={`https://wa.me/${ADMIN_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className={`${whatsappButton} mx-auto`}>
        <MessageCircle aria-hidden="true" size={18} />
        Hubungi via WhatsApp
      </a>
    </div>
  );
}

export function RegistrationForm() {
  // The page is prerendered, so the deadline is checked in the browser; the server snapshot stays open.
  const open = useSyncExternalStore(
    subscribeToNothing,
    () => isRegistrationOpen(new Date()),
    () => true
  );
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [sent, setSent] = useState<{ name: string; link: string } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? ""),
      age: String(data.get("age") ?? ""),
      scheduleId: String(data.get("scheduleId") ?? ""),
      readingLevel: String(data.get("readingLevel") ?? ""),
      notes: String(data.get("notes") ?? ""),
      ikhwan: data.get("ikhwan") === "on"
    };
    const nextErrors = validateRegistration(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const link = registrationLink(values);
    setSent({ name: values.name.trim(), link });
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (!open) return <RegistrationClosed />;

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center rounded-4xl border border-gold/30 bg-surface/70 px-6 py-14 text-center">
        <CircleCheck aria-hidden="true" size={44} className="text-forest" />
        <h3 className="mt-5 font-display text-3xl font-light text-forest-deep">Satu langkah lagi, {sent.name.split(" ")[0]}.</h3>
        <p className="mt-3 max-w-md leading-7 text-ink-soft">
          Pesan pendaftaranmu sudah kami siapkan di WhatsApp. Tekan kirim di sana agar pendaftaranmu kami terima. Info pembayaran dan link
          kelas akan dikirim lewat chat itu.
        </p>
        <a href={sent.link} target="_blank" rel="noopener noreferrer" className={whatsappButton}>
          <MessageCircle aria-hidden="true" size={18} />
          Buka WhatsApp lagi
        </a>
        <Link href="/lanjutan" className="mt-4 rounded-full px-6 py-3 text-sm font-semibold text-forest-deep transition hover:bg-surface">
          Sambil menunggu, lihat materi Lanjutan
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-4xl border border-forest/10 bg-surface/60 p-6 md:p-8" noValidate>
      <fieldset>
        <legend className="text-sm font-medium text-forest-deep">Pilih jadwal</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {classSchedules.map(({ id, day, time }) => (
            <label
              key={id}
              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-forest/15 bg-surface/70 p-4 transition hover:border-gold/60 has-checked:border-brand has-checked:bg-brand/5 dark:has-checked:border-gold"
            >
              <input type="radio" name="scheduleId" value={id} className="mt-1 size-4 accent-brand" />
              <span>
                <span className="block font-medium text-forest-deep">{day}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{time}</span>
              </span>
            </label>
          ))}
        </div>
        <FieldError error={errors.scheduleId} />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-[1fr_8rem]">
        <label className="block">
          <span className="text-sm font-medium text-forest-deep">Nama lengkap</span>
          <input className={inputClass} name="name" autoComplete="name" required maxLength={80} aria-invalid={Boolean(errors.name)} />
          <FieldError error={errors.name} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-deep">Usia</span>
          <input
            className={inputClass}
            name="age"
            type="number"
            inputMode="numeric"
            min={MIN_AGE}
            max={100}
            required
            aria-invalid={Boolean(errors.age)}
          />
          <FieldError error={errors.age} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-forest-deep">Kemampuan membaca saat ini</span>
          <select className={inputClass} name="readingLevel" required defaultValue="" aria-invalid={Boolean(errors.readingLevel)}>
            <option value="" disabled>
              Pilih salah satu
            </option>
            {readingLevels.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <FieldError error={errors.readingLevel} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-forest-deep">Catatan (opsional)</span>
          <textarea
            className={`${inputClass} min-h-24`}
            name="notes"
            maxLength={500}
            placeholder="Misalnya bagian bacaan yang ingin diperbaiki."
            aria-invalid={Boolean(errors.notes)}
          />
          <FieldError error={errors.notes} />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="ikhwan" className="mt-0.5 size-4 accent-brand" />
        <span>
          Saya laki-laki (ikhwan). Kelas gelombang ini khusus ikhwan.
          <FieldError error={errors.ikhwan} />
        </span>
      </label>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:bg-brand-deep"
      >
        <MessageCircle aria-hidden="true" size={18} />
        Daftar lewat WhatsApp
      </button>
    </form>
  );
}

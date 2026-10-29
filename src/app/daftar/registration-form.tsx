"use client";

import { CircleCheck, LoaderCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { classIds, classInfo, readingLevelLabels, readingLevels } from "@/lib/class-offer";
import { register, type RegistrationFormState } from "./actions";

const inputClass =
  "mt-2 w-full rounded-2xl border border-forest/15 bg-surface/70 px-4 py-3 text-ink outline-none transition placeholder:text-ink-soft/40 focus:border-gold focus:bg-surface focus:ring-4 focus:ring-gold-soft/30 aria-invalid:border-red-700/50";

function FieldError({ error, hint }: { error?: string; hint?: string }) {
  return error ? (
    <span className="mt-1.5 block text-xs text-red-800 dark:text-red-300">{error}</span>
  ) : (
    hint && <span className="mt-1.5 block text-xs text-ink-soft/70">{hint}</span>
  );
}

function ConfirmButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-6 flex w-fit items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-deep"
    >
      <MessageCircle aria-hidden="true" size={18} />
      Konfirmasi via WhatsApp
    </a>
  );
}

export function RegistrationForm() {
  const [state, action, pending] = useActionState<RegistrationFormState, FormData>(register, {});
  const errors = state.errors ?? {};
  const values = state.values;

  if (state.done) {
    return (
      <div role="status" className="flex flex-col items-center rounded-[2rem] border border-gold/30 bg-surface/70 px-6 py-14 text-center">
        <CircleCheck aria-hidden="true" size={44} className="text-forest" />
        <h2 className="mt-5 font-display text-3xl font-light text-forest-deep">
          Jazakallahu khairan{state.done.name ? `, ${state.done.name.split(" ")[0]}` : ""}.
        </h2>
        {state.done.confirmationUrl ? (
          <>
            <p className="mt-3 max-w-md leading-7 text-ink-soft">
              Satu langkah lagi: kirim konfirmasi lewat WhatsApp. Info pembayaran dan jadwal akan dikirim di sana.
            </p>
            <ConfirmButton href={state.done.confirmationUrl} />
          </>
        ) : (
          <p className="mt-3 max-w-md leading-7 text-ink-soft">
            Pendaftaranmu sudah kami terima. Kami akan menghubungimu lewat WhatsApp untuk konfirmasi jadwal dan pembayaran.
          </p>
        )}
        <Link
          href="/praktik"
          className="mt-4 rounded-full px-6 py-3 text-sm font-semibold text-forest-deep transition hover:bg-surface"
        >
          Sambil menunggu, mulai Ibtida
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6 rounded-[2rem] border border-forest/10 bg-surface/60 p-6 md:p-8" noValidate>
      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset>
        <legend className="text-sm font-medium text-forest-deep">Pilih kelas</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {classIds.map((id) => (
            <label
              key={id}
              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-forest/15 bg-surface/70 p-4 transition hover:border-gold/60 has-checked:border-brand has-checked:bg-brand/5"
            >
              <input
                type="radio"
                name="classId"
                value={id}
                defaultChecked={values?.classId === id}
                className="mt-1 size-4 accent-brand"
              />
              <span>
                <span className="block font-medium text-forest-deep">{classInfo[id].label}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{classInfo[id].day}</span>
              </span>
            </label>
          ))}
        </div>
        <FieldError error={errors.classId} hint="Setiap pendaftar hanya bisa mengikuti satu kelas." />
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-forest-deep">Nama lengkap</span>
          <input
            className={inputClass}
            name="name"
            autoComplete="name"
            required
            defaultValue={values?.name}
            aria-invalid={Boolean(errors.name)}
          />
          <FieldError error={errors.name} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-deep">Nomor WhatsApp</span>
          <input
            className={inputClass}
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="0812 3456 7890"
            defaultValue={values?.whatsapp}
            aria-invalid={Boolean(errors.whatsapp)}
          />
          <FieldError error={errors.whatsapp} hint="Untuk konfirmasi jadwal dan link kelas." />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-deep">Usia</span>
          <input
            className={inputClass}
            name="age"
            type="number"
            inputMode="numeric"
            min={12}
            max={80}
            required
            defaultValue={values?.age}
            aria-invalid={Boolean(errors.age)}
          />
          <FieldError error={errors.age} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-deep">Domisili (opsional)</span>
          <input
            className={inputClass}
            name="city"
            autoComplete="address-level2"
            placeholder="Kota"
            defaultValue={values?.city}
            aria-invalid={Boolean(errors.city)}
          />
          <FieldError error={errors.city} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-forest-deep">Kemampuan membaca saat ini</span>
          <select
            className={inputClass}
            name="readingLevel"
            required
            defaultValue={values?.readingLevel ?? ""}
            aria-invalid={Boolean(errors.readingLevel)}
          >
            <option value="" disabled>
              Pilih salah satu
            </option>
            {readingLevels.map((level) => (
              <option key={level} value={level}>
                {readingLevelLabels[level]}
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
            placeholder="Misalnya target hafalan atau kendala yang ingin diperbaiki."
            defaultValue={values?.notes}
            aria-invalid={Boolean(errors.notes)}
          />
          <FieldError error={errors.notes} />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="ikhwan" defaultChecked={values?.ikhwan} className="mt-0.5 size-4 accent-brand" />
        <span>
          Saya laki-laki (ikhwan). Kelas gelombang ini khusus ikhwan.
          <FieldError error={errors.ikhwan} />
        </span>
      </label>

      {state.message && (
        <div role="alert" className="rounded-2xl border border-red-800/15 bg-red-50 px-4 py-3 text-sm text-red-900">
          {state.message}
          {state.confirmationUrl && <ConfirmButton href={state.confirmationUrl} />}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:bg-brand-deep disabled:opacity-70"
      >
        {pending && <LoaderCircle aria-hidden="true" size={16} className="animate-spin" />}
        {pending ? "Mengirim…" : "Kirim pendaftaran"}
      </button>
    </form>
  );
}

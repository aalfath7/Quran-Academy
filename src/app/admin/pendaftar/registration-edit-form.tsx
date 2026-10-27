"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import type { Registration } from "@/db/schema";
import { classIds, classInfo, readingLevelLabels, readingLevels } from "@/lib/class-offer";
import { saveRegistration, type RegistrationEditState } from "../actions";

const inputClass =
  "mt-2 w-full rounded-2xl border border-forest/15 bg-surface/70 px-4 py-3 text-ink outline-none transition placeholder:text-ink-soft/40 focus:border-gold focus:bg-surface focus:ring-4 focus:ring-gold-soft/30 aria-invalid:border-red-700/50";

function Field({
  label,
  hint,
  error,
  className = "",
  children
}: {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium text-forest-deep">{label}</span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs text-red-800">{error}</span>
      ) : (
        hint && <span className="mt-1.5 block text-xs text-ink-soft/70">{hint}</span>
      )}
    </label>
  );
}

export function RegistrationEditForm({ registration }: { registration: Registration }) {
  const [state, action, pending] = useActionState<RegistrationEditState, FormData>(saveRegistration, {});
  const errors = state.errors ?? {};
  const submitted = state.values;
  const initial = {
    classId: submitted?.classId ?? registration.classId,
    name: submitted?.name ?? registration.name,
    whatsapp: submitted?.whatsapp ?? registration.whatsapp,
    age: submitted?.age ?? registration.age,
    city: submitted?.city ?? registration.city ?? "",
    readingLevel: submitted?.readingLevel ?? registration.readingLevel,
    notes: submitted?.notes ?? registration.notes ?? "",
    wave: submitted?.wave ?? registration.wave,
    paid: submitted ? submitted.paid === "on" : registration.paid
  };

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1fr_18rem]">
      <input type="hidden" name="id" value={registration.id} />

      <div className="grid gap-6 rounded-[1.75rem] border border-forest/10 bg-surface/60 p-6 sm:grid-cols-2 md:p-8">
        <Field label="Nama lengkap" error={errors.name} className="sm:col-span-2">
          <input className={inputClass} name="name" required defaultValue={initial.name} aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field label="Nomor WhatsApp" hint="Boleh ditulis 08… atau +62…." error={errors.whatsapp}>
          <input
            className={inputClass}
            name="whatsapp"
            type="tel"
            required
            defaultValue={initial.whatsapp}
            aria-invalid={Boolean(errors.whatsapp)}
          />
        </Field>
        <Field label="Usia" error={errors.age}>
          <input
            className={inputClass}
            name="age"
            type="number"
            min={12}
            max={80}
            required
            defaultValue={initial.age}
            aria-invalid={Boolean(errors.age)}
          />
        </Field>
        <Field label="Domisili" error={errors.city}>
          <input className={inputClass} name="city" defaultValue={initial.city} aria-invalid={Boolean(errors.city)} />
        </Field>
        <Field label="Kemampuan membaca" error={errors.readingLevel}>
          <select
            className={inputClass}
            name="readingLevel"
            required
            defaultValue={initial.readingLevel}
            aria-invalid={Boolean(errors.readingLevel)}
          >
            {readingLevels.map((level) => (
              <option key={level} value={level}>
                {readingLevelLabels[level]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Catatan" error={errors.notes} className="sm:col-span-2">
          <textarea
            className={`${inputClass} min-h-24`}
            name="notes"
            maxLength={500}
            defaultValue={initial.notes}
            aria-invalid={Boolean(errors.notes)}
          />
        </Field>
      </div>

      <aside className="space-y-6">
        <div className="space-y-6 rounded-[1.75rem] border border-forest/10 bg-surface/60 p-6">
          <Field label="Kelas" error={errors.classId}>
            <select
              className={inputClass}
              name="classId"
              required
              defaultValue={initial.classId}
              aria-invalid={Boolean(errors.classId)}
            >
              {classIds.map((id) => (
                <option key={id} value={id}>
                  {classInfo[id].label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Gelombang" error={errors.wave}>
            <input
              className={inputClass}
              name="wave"
              type="number"
              min={1}
              max={99}
              required
              defaultValue={initial.wave}
              aria-invalid={Boolean(errors.wave)}
            />
          </Field>
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-forest/10 bg-paper/60 px-4 py-3.5">
            <span>
              <span className="block text-sm font-medium text-forest-deep">Sudah bayar</span>
              <span className="block text-xs text-ink-soft/70">Centang jika transfer sudah diterima</span>
            </span>
            <input type="checkbox" name="paid" defaultChecked={initial.paid} className="size-5 accent-forest" />
          </label>
        </div>

        {state.message && (
          <p role="alert" className="rounded-2xl border border-red-800/15 bg-red-50 px-4 py-3 text-sm text-red-900">
            {state.message}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:bg-brand-deep disabled:opacity-70"
          >
            {pending && <LoaderCircle aria-hidden="true" size={16} className="animate-spin" />}
            {pending ? "Menyimpan…" : "Simpan"}
          </button>
          <Link
            href="/admin/pendaftar"
            className="rounded-full border border-forest/15 px-5 py-3.5 text-sm font-medium text-forest-deep transition hover:bg-surface/70"
          >
            Batal
          </Link>
        </div>
      </aside>
    </form>
  );
}

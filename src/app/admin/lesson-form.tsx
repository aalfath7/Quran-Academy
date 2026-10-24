"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import type { Lesson } from "@/db/schema";
import { categoryInfo, lessonCategories } from "@/lib/categories";
import { saveLesson, type LessonFormState } from "./actions";

const inputClass =
  "mt-2 w-full rounded-2xl border border-forest/15 bg-surface/70 px-4 py-3 text-ink outline-none transition placeholder:text-ink-soft/40 focus:border-gold focus:bg-surface focus:ring-4 focus:ring-gold-soft/30 aria-invalid:border-red-700/50";

function Field({
  label,
  hint,
  error,
  children
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
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

export function LessonForm({ lesson }: { lesson?: Lesson }) {
  const [state, action, pending] = useActionState<LessonFormState, FormData>(saveLesson, {});
  const errors = state.errors ?? {};
  const submitted = state.values;
  const initial = {
    title: submitted?.title ?? lesson?.title,
    summary: submitted?.summary ?? lesson?.summary,
    arabicText: submitted?.arabicText ?? lesson?.arabicText ?? "",
    content: submitted?.content ?? lesson?.content,
    category: submitted?.category ?? lesson?.category ?? "",
    position: submitted?.position ?? lesson?.position ?? 0,
    slug: submitted?.slug ?? lesson?.slug,
    published: submitted ? submitted.published === "on" : (lesson?.published ?? false)
  };

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1fr_18rem]">
      {lesson && <input type="hidden" name="id" value={lesson.id} />}

      <div className="space-y-6 rounded-[1.75rem] border border-forest/10 bg-surface/60 p-6 md:p-8">
        <Field label="Judul" error={errors.title}>
          <input
            className={inputClass}
            name="title"
            required
            defaultValue={initial.title}
            aria-invalid={Boolean(errors.title)}
            placeholder="Mengenal hukum nun sukun dan tanwin"
          />
        </Field>
        <Field label="Ringkasan" hint="Tampil di kartu materi. Maksimal 300 karakter." error={errors.summary}>
          <textarea
            className={`${inputClass} min-h-24`}
            name="summary"
            required
            maxLength={300}
            defaultValue={initial.summary}
            aria-invalid={Boolean(errors.summary)}
          />
        </Field>
        <Field label="Teks Arab (opsional)" hint="Contoh ayat atau bacaan yang dibahas." error={errors.arabicText}>
          <textarea
            className={`${inputClass} min-h-24 text-right font-arabic text-2xl leading-loose`}
            name="arabicText"
            dir="rtl"
            lang="ar"
            defaultValue={initial.arabicText}
          />
        </Field>
        <Field label="Isi materi" hint="Pisahkan paragraf dengan satu baris kosong. Paragraf yang hanya berisi teks Arab (bait atau ayat) tampil sebagai kutipan Arab." error={errors.content}>
          <textarea
            className={`${inputClass} min-h-80 leading-7`}
            name="content"
            required
            defaultValue={initial.content}
            aria-invalid={Boolean(errors.content)}
          />
        </Field>
      </div>

      <aside className="space-y-6">
        <div className="space-y-6 rounded-[1.75rem] border border-forest/10 bg-surface/60 p-6">
          <Field label="Kategori" error={errors.category}>
            <select
              className={inputClass}
              name="category"
              required
              defaultValue={initial.category}
              aria-invalid={Boolean(errors.category)}
            >
              <option value="" disabled>
                Pilih kategori
              </option>
              {lessonCategories.map((category) => (
                <option key={category} value={category}>
                  {categoryInfo[category].label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Urutan" hint="Angka kecil tampil lebih dulu." error={errors.position}>
            <input
              className={inputClass}
              name="position"
              type="number"
              min={0}
              max={9999}
              defaultValue={initial.position}
              aria-invalid={Boolean(errors.position)}
            />
          </Field>
          <Field label="Slug (opsional)" hint="Kosongkan untuk dibuat dari judul." error={errors.slug}>
            <input
              className={inputClass}
              name="slug"
              defaultValue={initial.slug}
              aria-invalid={Boolean(errors.slug)}
              placeholder="nun-sukun-dan-tanwin"
            />
          </Field>
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-forest/10 bg-paper/60 px-4 py-3.5">
            <span>
              <span className="block text-sm font-medium text-forest-deep">Terbitkan</span>
              <span className="block text-xs text-ink-soft/70">Tampil di halaman belajar</span>
            </span>
            <input
              type="checkbox"
              name="published"
              defaultChecked={initial.published}
              className="size-5 accent-forest"
            />
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
            href="/admin"
            className="rounded-full border border-forest/15 px-5 py-3.5 text-sm font-medium text-forest-deep transition hover:bg-surface/70"
          >
            Batal
          </Link>
        </div>
      </aside>
    </form>
  );
}

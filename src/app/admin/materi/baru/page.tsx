import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { LessonForm } from "../../lesson-form";

export default async function NewLessonPage() {
  await requireAdmin();

  return (
    <>
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-forest">
        <ArrowLeft aria-hidden="true" size={16} /> Semua materi
      </Link>
      <h1 className="mb-10 mt-4 font-display text-4xl font-light tracking-tight text-forest-deep">Tambah materi</h1>
      <LessonForm />
    </>
  );
}

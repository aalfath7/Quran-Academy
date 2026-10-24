import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { lessonHref } from "@/lib/categories";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { getLesson } from "@/lib/lessons";
import { LessonForm } from "../../lesson-form";

export default async function EditLessonPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const lesson = await getLesson(await getDb(), (await params).id);
  if (!lesson) notFound();

  return (
    <>
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-forest">
        <ArrowLeft aria-hidden="true" size={16} /> Semua materi
      </Link>
      <div className="mb-10 mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl font-light tracking-tight text-forest-deep">Edit materi</h1>
        {lesson.published && (
          <Link
            href={lessonHref(lesson)}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest underline decoration-gold/50 underline-offset-4"
          >
            Lihat di situs <ExternalLink aria-hidden="true" size={14} />
          </Link>
        )}
      </div>
      <LessonForm key={lesson.updatedAt.getTime()} lesson={lesson} />
    </>
  );
}

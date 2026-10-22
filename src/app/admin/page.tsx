import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { getDb } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { categoryInfo } from "@/lib/categories";
import { listAllLessons } from "@/lib/lessons";
import { DeleteLessonButton } from "./delete-lesson-button";

const statusMessages: Record<string, string> = {
  tersimpan: "Materi berhasil disimpan.",
  terhapus: "Materi berhasil dihapus."
};

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const lessons = await listAllLessons(await getDb());
  const publishedCount = lessons.filter(({ published }) => published).length;

  return (
    <>
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Materi belajar</p>
          <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-forest-deep">Kelola materi</h1>
          <p className="mt-2 text-ink-soft">
            {lessons.length} materi · {publishedCount} terbit · {lessons.length - publishedCount} draf
          </p>
        </div>
        <Link
          href="/admin/materi/baru"
          className="inline-flex items-center gap-2 self-start rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-paper shadow-xl shadow-forest/20 transition hover:bg-forest-deep sm:self-auto"
        >
          <Plus aria-hidden="true" size={16} />
          Tambah materi
        </Link>
      </div>

      {status && statusMessages[status] && (
        <p role="status" className="mt-8 rounded-2xl border border-forest/15 bg-forest/5 px-5 py-3.5 text-sm text-forest">
          {statusMessages[status]}
        </p>
      )}

      {lessons.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border border-dashed border-gold/40 bg-paper-deep/40 px-8 py-16 text-center">
          <h2 className="font-display text-2xl font-light text-forest-deep">Belum ada materi.</h2>
          <p className="mt-2 text-ink-soft">Tambahkan materi pertama untuk mengisi halaman belajar.</p>
        </div>
      ) : (
        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-forest/10 bg-white/60">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-forest/10 bg-paper-deep/40 text-xs uppercase tracking-[0.14em] text-ink-soft">
              <tr>
                <th className="px-6 py-4 font-semibold">Judul</th>
                <th className="hidden px-4 py-4 font-semibold md:table-cell">Kategori</th>
                <th className="hidden px-4 py-4 font-semibold sm:table-cell">Urutan</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="transition hover:bg-white/80">
                  <td className="px-6 py-4">
                    <p className="font-medium text-forest-deep">{lesson.title}</p>
                    <p className="mt-0.5 text-xs text-ink-soft/70">/belajar/{lesson.slug}</p>
                  </td>
                  <td className="hidden px-4 py-4 text-ink-soft md:table-cell">{categoryInfo[lesson.category].label}</td>
                  <td className="hidden px-4 py-4 text-ink-soft sm:table-cell">{lesson.position}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        lesson.published ? "bg-forest/10 text-forest" : "bg-gold-soft/40 text-[#7a5a1f]"
                      }`}
                    >
                      {lesson.published ? "Terbit" : "Draf"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/materi/${lesson.id}`}
                        className="inline-flex size-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-forest/5 hover:text-forest"
                        aria-label={`Edit ${lesson.title}`}
                      >
                        <Pencil aria-hidden="true" size={16} />
                      </Link>
                      <DeleteLessonButton id={lesson.id} title={lesson.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

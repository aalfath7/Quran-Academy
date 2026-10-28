import { MessageCircle, Pencil } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { classIds, classInfo, readingLevelLabels } from "@/lib/class-offer";
import { listRegistrations } from "@/lib/registrations";
import { updateRegistrationPaid } from "../actions";
import { DeleteRegistrationButton } from "./delete-registration-button";

export const metadata: Metadata = {
  title: "Pendaftar · Admin"
};

const statusMessages: Record<string, string> = {
  tersimpan: "Data pendaftar berhasil disimpan.",
  terhapus: "Pendaftar berhasil dihapus."
};

const dateFormat = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });

export default async function RegistrationsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const registrations = await listRegistrations(await getDb());
  const paidCount = registrations.filter(({ paid }) => paid).length;

  return (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Kelas online</p>
        <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-forest-deep">Pendaftar</h1>
        <p className="mt-2 text-ink-soft">
          {registrations.length} pendaftar · {paidCount} sudah bayar · {registrations.length - paidCount} belum bayar
        </p>
      </div>

      {status && statusMessages[status] && (
        <p role="status" className="mt-8 rounded-2xl border border-forest/15 bg-forest/5 px-5 py-3.5 text-sm text-forest">
          {statusMessages[status]}
        </p>
      )}

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {classIds.map((id) => (
          <div key={id} className="rounded-3xl border border-forest/10 bg-surface/60 p-5">
            <dt className="text-sm text-ink-soft">{classInfo[id].label}</dt>
            <dd className="mt-1 font-display text-3xl font-light text-forest-deep">
              {registrations.filter(({ classId }) => classId === id).length}
              <span className="ml-1.5 text-sm text-ink-soft">
                pendaftar · {registrations.filter(({ classId, paid }) => classId === id && paid).length} sudah bayar
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {registrations.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border border-dashed border-gold/40 bg-paper-deep/40 px-8 py-16 text-center">
          <h2 className="font-display text-2xl font-light text-forest-deep">Belum ada pendaftar.</h2>
          <p className="mt-2 text-ink-soft">Bagikan halaman /daftar untuk membuka pendaftaran.</p>
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-[1.75rem] border border-forest/10 bg-surface/60">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead className="border-b border-forest/10 bg-paper-deep/40 text-xs uppercase tracking-[0.14em] text-ink-soft">
              <tr>
                <th className="px-6 py-4 font-semibold">Pendaftar</th>
                <th className="px-4 py-4 font-semibold">Kelas</th>
                <th className="px-4 py-4 font-semibold">Kemampuan</th>
                <th className="px-4 py-4 font-semibold">Masuk</th>
                <th className="px-4 py-4 font-semibold">Pembayaran</th>
                <th className="px-6 py-4 text-right font-semibold">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {registrations.map((registration) => (
                <tr key={registration.id} className="align-top transition hover:bg-surface/80">
                  <td className="px-6 py-4">
                    <p className="font-medium text-forest-deep">{registration.name}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {registration.age} tahun{registration.city ? ` · ${registration.city}` : ""} · Gelombang {registration.wave}
                    </p>
                    <a
                      href={`https://wa.me/${registration.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-forest transition hover:text-gold"
                    >
                      <MessageCircle aria-hidden="true" size={13} />+{registration.whatsapp}
                    </a>
                    {registration.notes && <p className="mt-2 max-w-xs text-xs leading-5 text-ink-soft">“{registration.notes}”</p>}
                  </td>
                  <td className="px-4 py-4 text-ink-soft">{classInfo[registration.classId].label.replace("Kelas ", "")}</td>
                  <td className="px-4 py-4 text-ink-soft">{readingLevelLabels[registration.readingLevel]}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-ink-soft">{dateFormat.format(registration.createdAt)}</td>
                  <td className="px-4 py-4">
                    <form action={updateRegistrationPaid}>
                      <input type="hidden" name="id" value={registration.id} />
                      <input type="hidden" name="paid" value={String(!registration.paid)} />
                      <button
                        type="submit"
                        title={registration.paid ? "Klik untuk membatalkan tanda bayar" : "Klik jika transfer sudah diterima"}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                          registration.paid
                            ? "bg-brand text-cream hover:bg-brand-deep"
                            : "bg-gold-soft/40 text-[#7a5a1f] hover:bg-gold-soft/60 dark:bg-gold-soft/15 dark:text-gold-soft"
                        }`}
                      >
                        {registration.paid ? "Sudah bayar" : "Belum bayar"}
                      </button>
                    </form>
                    {registration.paidAt && (
                      <p className="mt-1.5 text-xs text-ink-soft">{dateFormat.format(registration.paidAt)}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/pendaftar/${registration.id}`}
                        className="inline-flex size-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-forest/5 hover:text-forest"
                        aria-label={`Edit ${registration.name}`}
                      >
                        <Pencil aria-hidden="true" size={16} />
                      </Link>
                      <DeleteRegistrationButton id={registration.id} name={registration.name} />
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

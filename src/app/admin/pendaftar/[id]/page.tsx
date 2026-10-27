import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { getRegistration } from "@/lib/registrations";
import { DeleteRegistrationButton } from "../delete-registration-button";
import { RegistrationEditForm } from "../registration-edit-form";

export const metadata: Metadata = {
  title: "Edit pendaftar · Admin · Fathway Quran"
};

export default async function EditRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const registration = await getRegistration(await getDb(), (await params).id);
  if (!registration) notFound();

  return (
    <>
      <Link href="/admin/pendaftar" className="inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-forest">
        <ArrowLeft aria-hidden="true" size={16} /> Semua pendaftar
      </Link>
      <div className="mb-10 mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl font-light tracking-tight text-forest-deep">Edit pendaftar</h1>
        <DeleteRegistrationButton id={registration.id} name={registration.name} withLabel />
      </div>
      <RegistrationEditForm key={registration.updatedAt.getTime()} registration={registration} />
    </>
  );
}

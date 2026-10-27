"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { requireAdmin, signOut } from "@/lib/auth";
import { createLesson, deleteLesson, getLesson, isSlugTaken, lessonInputSchema, updateLesson } from "@/lib/lessons";
import {
  deleteRegistration,
  getRegistration,
  isAlreadyRegistered,
  registrationEditSchema,
  setRegistrationPaid,
  updateRegistration
} from "@/lib/registrations";

const formFields = ["title", "slug", "category", "summary", "arabicText", "content", "position", "published"] as const;

export type LessonFormState = {
  errors?: Partial<Record<string, string>>;
  message?: string;
  // Submitted values, so the form can restore them after React resets it.
  values?: Partial<Record<(typeof formFields)[number], string>>;
};

export async function saveLesson(_prev: LessonFormState, formData: FormData): Promise<LessonFormState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "") || undefined;
  const values = Object.fromEntries(formFields.map((field) => [field, String(formData.get(field) ?? "")]));
  const parsed = lessonInputSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") ?? "",
    category: formData.get("category"),
    summary: formData.get("summary"),
    arabicText: formData.get("arabicText") ?? "",
    content: formData.get("content"),
    position: formData.get("position") || 0,
    published: formData.get("published") === "on"
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { errors, values, message: "Periksa kembali isian yang ditandai." };
  }

  const db = await getDb();
  if (id && !(await getLesson(db, id))) return { values, message: "Materi tidak ditemukan." };
  if (await isSlugTaken(db, parsed.data.slug, id)) {
    return { errors: { slug: "Slug sudah dipakai materi lain." }, values, message: "Periksa kembali isian yang ditandai." };
  }

  if (id) await updateLesson(db, id, parsed.data);
  else await createLesson(db, parsed.data);

  redirect("/admin?status=tersimpan");
}

export async function removeLesson(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (id) await deleteLesson(await getDb(), id);

  redirect("/admin?status=terhapus");
}

export async function logout() {
  await signOut();
  redirect("/login");
}

export async function updateRegistrationPaid(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (id) await setRegistrationPaid(await getDb(), id, formData.get("paid") === "true");

  revalidatePath("/admin/pendaftar");
}

const registrationFields = ["classId", "name", "whatsapp", "age", "city", "readingLevel", "notes", "wave", "paid"] as const;

export type RegistrationEditState = {
  errors?: Partial<Record<string, string>>;
  message?: string;
  // Submitted values, so the form can restore them after React resets it.
  values?: Partial<Record<(typeof registrationFields)[number], string>>;
};

export async function saveRegistration(_prev: RegistrationEditState, formData: FormData): Promise<RegistrationEditState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const values = Object.fromEntries(registrationFields.map((field) => [field, String(formData.get(field) ?? "")]));
  const parsed = registrationEditSchema.safeParse({ ...values, paid: formData.get("paid") === "on" });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { errors, values, message: "Periksa kembali isian yang ditandai." };
  }

  const db = await getDb();
  const registration = await getRegistration(db, id);
  if (!registration) return { values, message: "Pendaftar tidak ditemukan." };
  if (await isAlreadyRegistered(db, parsed.data.whatsapp, parsed.data.wave, id)) {
    return {
      errors: { whatsapp: "Nomor ini sudah dipakai pendaftar lain di gelombang yang sama." },
      values,
      message: "Periksa kembali isian yang ditandai."
    };
  }

  await updateRegistration(db, id, parsed.data, registration.paidAt);
  redirect("/admin/pendaftar?status=tersimpan");
}

export async function removeRegistration(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (id) await deleteRegistration(await getDb(), id);

  redirect("/admin/pendaftar?status=terhapus");
}

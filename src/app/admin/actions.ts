"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { requireAdmin, signOut } from "@/lib/auth";
import { createLesson, deleteLesson, getLesson, isSlugTaken, lessonInputSchema, updateLesson } from "@/lib/lessons";

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

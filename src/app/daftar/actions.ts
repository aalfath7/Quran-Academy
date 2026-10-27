"use server";

import { getDb } from "@/db";
import { confirmationLink } from "@/lib/class-offer";
import { createRegistration, isAlreadyRegistered, registrationInputSchema } from "@/lib/registrations";

const formFields = ["classId", "name", "whatsapp", "age", "city", "readingLevel", "notes"] as const;

export type RegistrationFormState = {
  done?: { name: string; confirmationUrl: string | null };
  errors?: Partial<Record<string, string>>;
  message?: string;
  /** Set when the number is already registered, so the registrant can still confirm on WhatsApp. */
  confirmationUrl?: string | null;
  // Submitted values, so the form can restore them after React resets it.
  values?: Partial<Record<(typeof formFields)[number], string>> & { ikhwan?: boolean };
};

export async function register(_prev: RegistrationFormState, formData: FormData): Promise<RegistrationFormState> {
  // Bots fill every field; people never see this one.
  if (formData.get("website")) return { done: { name: "", confirmationUrl: null } };

  const values = {
    ...Object.fromEntries(formFields.map((field) => [field, String(formData.get(field) ?? "")])),
    ikhwan: formData.get("ikhwan") === "on"
  };
  const parsed = registrationInputSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { errors, values, message: "Periksa kembali isian yang ditandai." };
  }

  const db = await getDb();
  if (await isAlreadyRegistered(db, parsed.data.whatsapp)) {
    return {
      confirmationUrl: confirmationLink(parsed.data),
      errors: { whatsapp: "Nomor ini sudah terdaftar di gelombang ini. Satu nomor hanya untuk satu kelas." },
      values,
      message: "Pendaftaran dengan nomor ini sudah kami terima. Jika belum konfirmasi, kirim konfirmasi lewat WhatsApp."
    };
  }

  await createRegistration(db, parsed.data);

  return { done: { name: parsed.data.name, confirmationUrl: confirmationLink(parsed.data) } };
}

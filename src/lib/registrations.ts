import { and, desc, eq, ne } from "drizzle-orm";
import { z } from "zod";
import type { createDb } from "@/db/connection";
import { registrations } from "@/db/schema";
import { classIds, CURRENT_WAVE, readingLevels } from "./class-offer";

type Db = ReturnType<typeof createDb>;

/** Indonesian WhatsApp number in international form without "+": "0812-3456 789" and "+62 812…" both become "62812…". */
export function normalizeWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

export const registrationInputSchema = z.object({
  name: z.string().trim().min(3, "Nama minimal 3 karakter.").max(80, "Nama maksimal 80 karakter."),
  whatsapp: z
    .string()
    .trim()
    .transform(normalizeWhatsapp)
    .refine((value) => /^628\d{7,12}$/.test(value), "Masukkan nomor WhatsApp yang valid, contoh 0812 3456 7890."),
  age: z.coerce
    .number({ error: "Usia harus berupa angka." })
    .int("Usia harus bilangan bulat.")
    .min(12, "Kelas ini untuk usia 12 tahun ke atas.")
    .max(80, "Periksa kembali usia."),
  city: z
    .string()
    .trim()
    .max(80, "Domisili maksimal 80 karakter.")
    .transform((value) => value || null),
  classId: z.enum(classIds, { error: "Pilih satu kelas." }),
  readingLevel: z.enum(readingLevels, { error: "Pilih kemampuan membaca saat ini." }),
  notes: z
    .string()
    .trim()
    .max(500, "Catatan maksimal 500 karakter.")
    .transform((value) => value || null),
  ikhwan: z.literal(true, { error: "Kelas gelombang ini khusus ikhwan." })
});

export type RegistrationInput = z.output<typeof registrationInputSchema>;

/** What the admin can change: the registrant's answers, the wave, and payment; the ikhwan confirmation is not asked again. */
export const registrationEditSchema = registrationInputSchema.omit({ ikhwan: true }).extend({
  wave: z.coerce.number({ error: "Gelombang harus berupa angka." }).int().min(1, "Gelombang minimal 1.").max(99),
  paid: z.boolean()
});

export type RegistrationEdit = z.output<typeof registrationEditSchema>;

/** Whether another sign-up in the wave already uses this number; `exceptId` skips the one being edited. */
export async function isAlreadyRegistered(db: Db, whatsapp: string, wave = CURRENT_WAVE, exceptId?: string) {
  const [row] = await db
    .select({ id: registrations.id })
    .from(registrations)
    .where(
      and(
        eq(registrations.whatsapp, whatsapp),
        eq(registrations.wave, wave),
        exceptId ? ne(registrations.id, exceptId) : undefined
      )
    )
    .limit(1);

  return Boolean(row);
}

export async function createRegistration(db: Db, input: RegistrationInput, wave = CURRENT_WAVE) {
  const id = crypto.randomUUID();
  // The ikhwan box is only a confirmation, so it is not stored.
  const { name, whatsapp, age, city, classId, readingLevel, notes } = input;
  await db.insert(registrations).values({ id, name, whatsapp, age, city, classId, readingLevel, notes, wave });

  return id;
}

export function listRegistrations(db: Db) {
  return db.select().from(registrations).orderBy(desc(registrations.createdAt));
}

export async function getRegistration(db: Db, id: string) {
  const [registration] = await db.select().from(registrations).where(eq(registrations.id, id)).limit(1);

  return registration ?? null;
}

/** Saves the admin's edits; the payment date is kept while still paid, set when newly paid, and cleared when unpaid. */
export async function updateRegistration(db: Db, id: string, { paid, ...input }: RegistrationEdit, paidAt: Date | null) {
  const now = new Date();
  await db
    .update(registrations)
    .set({ ...input, paid, paidAt: paid ? (paidAt ?? now) : null, updatedAt: now })
    .where(eq(registrations.id, id));
}

export async function deleteRegistration(db: Db, id: string) {
  await db.delete(registrations).where(eq(registrations.id, id));
}

export async function setRegistrationPaid(db: Db, id: string, paid: boolean) {
  const now = new Date();
  await db
    .update(registrations)
    .set({ paid, paidAt: paid ? now : null, updatedAt: now })
    .where(eq(registrations.id, id));
}

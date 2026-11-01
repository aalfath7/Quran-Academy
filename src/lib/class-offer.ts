// Dependency-free: the live class open for registration, shared by the home page, /daftar, and its form.
// Each new wave is an edit here. Sign-ups are not stored: the form only writes the WhatsApp message to the admin.

export const CLASS_NAME = "Kelas Perbaikan Bacaan Al-Quran";
export const CURRENT_WAVE = 1;
export const CLASS_PRICE = "Rp100.000";
export const MIN_AGE = 13;
export const REGISTRATION_DEADLINE_LABEL = "Jumat, 13 November";
export const CLASS_START_LABEL = "pekan 17 November";

/** First moment registration is closed: the end of the deadline day in WIB, whatever the visitor's time zone. */
const REGISTRATION_CLOSES_AT = new Date("2026-11-14T00:00:00+07:00");

/** Admin WhatsApp in international form without "+", as wa.me wants it. */
export const ADMIN_WHATSAPP = "6281291094514";
export const ADMIN_WHATSAPP_LABEL = "0812-9109-4514";

export const classSchedules = [
  { id: "selasa", day: "Selasa · ba'da Isya", time: "19.30–20.30 WIB" },
  { id: "sabtu", day: "Sabtu · ba'da Subuh", time: "05.30–06.30 WIB" }
] as const;

export const classFacts = ["Online via Google Meet", "1× seminggu · 4 sesi", "Kuota 5 orang", `Usia ${MIN_AGE} tahun ke atas`];

export const readingLevels = [
  { id: "terbata", label: "Bisa membaca, tapi masih terbata-bata" },
  { id: "lancar", label: "Sudah lancar, ingin memperbaiki bacaan" }
] as const;

export const teacher = {
  name: "Farhan Abdillah Alfath",
  photo: "/pengajar.webp",
  credentials: ["Pengajar Al-Quran", "Alumni Indonesian Al-Quran Center"]
};

export type RegistrationValues = {
  name: string;
  age: string;
  scheduleId: string;
  readingLevel: string;
  notes: string;
  ikhwan: boolean;
};

export type RegistrationErrors = Partial<Record<keyof RegistrationValues, string>>;

export const isRegistrationOpen = (now: Date) => now < REGISTRATION_CLOSES_AT;

/** One message per invalid field; an empty object means the sign-up can be sent. */
export function validateRegistration({ name, age, scheduleId, readingLevel, notes, ikhwan }: RegistrationValues) {
  const errors: RegistrationErrors = {};
  const trimmedName = name.trim();
  const ageNumber = Number(age);

  if (trimmedName.length < 3) errors.name = "Nama minimal 3 karakter.";
  else if (trimmedName.length > 80) errors.name = "Nama maksimal 80 karakter.";

  if (!age.trim() || !Number.isInteger(ageNumber)) errors.age = "Usia harus berupa angka.";
  else if (ageNumber < MIN_AGE) errors.age = `Kelas ini untuk usia ${MIN_AGE} tahun ke atas.`;
  else if (ageNumber > 100) errors.age = "Periksa kembali usia.";

  if (!classSchedules.some(({ id }) => id === scheduleId)) errors.scheduleId = "Pilih satu jadwal.";
  if (!readingLevels.some(({ id }) => id === readingLevel)) errors.readingLevel = "Pilih kemampuan membaca saat ini.";
  if (notes.trim().length > 500) errors.notes = "Catatan maksimal 500 karakter.";
  if (!ikhwan) errors.ikhwan = "Kelas gelombang ini khusus ikhwan.";

  return errors;
}

/** wa.me link that opens a chat with the admin, with the sign-up already written out for valid values. */
export function registrationLink({ name, age, scheduleId, readingLevel, notes }: RegistrationValues) {
  const schedule = classSchedules.find(({ id }) => id === scheduleId);
  const level = readingLevels.find(({ id }) => id === readingLevel);
  const text = [
    `Assalamu'alaikum, saya ingin mendaftar ${CLASS_NAME} di Fathway Quran.`,
    "",
    `Nama: ${name.trim()}`,
    `Usia: ${Number(age)} tahun`,
    `Jadwal: ${schedule?.day} (${schedule?.time})`,
    `Kemampuan membaca: ${level?.label}`,
    ...(notes.trim() ? [`Catatan: ${notes.trim()}`] : []),
    `Gelombang: ${CURRENT_WAVE}`,
    "",
    "Mohon info pembayarannya. Jazakallahu khairan."
  ].join("\n");

  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

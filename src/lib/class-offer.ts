// Dependency-free: the classes open for registration, shared by the /daftar page, its form, and the admin list.

export const CURRENT_WAVE = 1;
export const CLASS_PRICE = "Rp100.000";

/** Admin WhatsApp in international form without "+" (e.g. "6281234567890"); registrants confirm and pay there. */
export const ADMIN_WHATSAPP = "6281291094514";

export const classIds = ["tahsin", "tajwid", "tahfidz"] as const;
export type ClassId = (typeof classIds)[number];

export const classInfo: Record<ClassId, { label: string; description: string; day: string; time: string }> = {
  tahsin: {
    label: "Kelas Tahsin",
    description: "Latihan pengenalan huruf hijaiyah sampai bisa membaca Al-Quran.",
    day: "Senin · ba'da Ashar",
    time: "16.00–17.00 WIB"
  },
  tajwid: {
    label: "Kelas Tajwid",
    description: "Perbaikan bacaan serta pemahaman hukum-hukum tajwid.",
    day: "Rabu · ba'da Ashar",
    time: "16.00–17.00 WIB"
  },
  tahfidz: {
    label: "Kelas Tahfidz",
    description: "Menghafal dan setoran hafalan, dengan perbaikan bacaan di akhir sesi.",
    day: "Sabtu · ba'da Subuh",
    time: "05.30–06.30 WIB"
  }
};

export const classFacts = [
  "Online via Google Meet",
  "Maks. 5 murid per kelas",
  "1× seminggu · 4 sesi/bulan",
  "Remaja & dewasa"
];

export const readingLevels = ["belum-bisa", "terbata", "lancar"] as const;
export type ReadingLevel = (typeof readingLevels)[number];

export const readingLevelLabels: Record<ReadingLevel, string> = {
  "belum-bisa": "Belum bisa membaca Al-Quran",
  terbata: "Bisa, tapi masih terbata-bata",
  lancar: "Sudah lancar, ingin memperbaiki tajwid"
};

export const teacher = {
  name: "Farhan Abdillah Alfath",
  photo: "/pengajar.webp",
  credentials: ["Murid Syekh Khanova Maulana", "Alumni Indonesian Al-Quran Center"]
};

/** wa.me link to the admin with the registrant's details filled in, or null while no admin number is set. */
export function confirmationLink(registrant: { name: string; classId: ClassId; age: number; whatsapp: string }) {
  if (!ADMIN_WHATSAPP) return null;
  const text = [
    "Assalamu'alaikum, saya sudah mendaftar kelas online Fathway Quran.",
    "",
    `Nama: ${registrant.name}`,
    `Kelas: ${classInfo[registrant.classId].label} (${classInfo[registrant.classId].day})`,
    `Usia: ${registrant.age} tahun`,
    `No. WA: +${registrant.whatsapp}`,
    `Gelombang: ${CURRENT_WAVE}`,
    "",
    "Mohon info pembayarannya. Jazakallahu khairan."
  ].join("\n");

  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

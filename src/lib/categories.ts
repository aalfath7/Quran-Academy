// Dependency-free so client components can import it without pulling in Drizzle.

export const lessonCategories = ["tilawah", "tajwid", "tahfidz"] as const;
export type LessonCategory = (typeof lessonCategories)[number];

export const categoryInfo: Record<LessonCategory, { label: string; arabic: string; description: string }> = {
  tilawah: { label: "Tilawah", arabic: "تِلَاوَة", description: "Membaca dengan lancar dan tartil." },
  tajwid: { label: "Tajwid", arabic: "تَجْوِيد", description: "Memahami kaidah bacaan yang benar." },
  tahfidz: { label: "Tahfidz", arabic: "تَحْفِيظ", description: "Menghafal dan menjaga hafalan." }
};

export function isLessonCategory(value: unknown): value is LessonCategory {
  return lessonCategories.includes(value as LessonCategory);
}

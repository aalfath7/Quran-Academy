// Dependency-free so client components can import it without pulling in the lesson data.

export const lessonCategories = ["praktik", "tajwid"] as const;
export type LessonCategory = (typeof lessonCategories)[number];

/** Categories shown under the "Lanjutan" menu; praktik has its own pages under /pemula. */
export const materiCategories = ["tajwid"] as const satisfies readonly LessonCategory[];
export type MateriCategory = (typeof materiCategories)[number];

/** `audience` says who a class is for, `description` what it teaches; menus show both. */
export const categoryInfo: Record<LessonCategory, { label: string; arabic: string; audience: string; description: string }> = {
  praktik: {
    label: "Pemula",
    arabic: "اِبْتِدَاء",
    audience: "Untuk yang belum bisa membaca Al-Qur'an, mulai dari nol.",
    description: "Mengenal huruf hijaiyah, harakat, dan tanda baca sampai bisa membaca langsung dari mushaf."
  },
  tajwid: {
    label: "Lanjutan",
    arabic: "تَرْتِيل",
    audience: "Untuk yang sudah bisa membaca, tetapi belum lancar dan belum paham tajwid.",
    description: "Memperlancar bacaan sambil memahami hukum tajwid langkah demi langkah, langsung di ayat dan mushaf."
  }
};

export function isMateriCategory(value: unknown): value is MateriCategory {
  return materiCategories.includes(value as MateriCategory);
}

/** Where a lesson is read: practice drills have their own focused pages. */
export function lessonHref(lesson: { slug: string; category: LessonCategory }) {
  return lesson.category === "praktik" ? `/pemula/${lesson.slug}` : `/lanjutan/${lesson.slug}`;
}

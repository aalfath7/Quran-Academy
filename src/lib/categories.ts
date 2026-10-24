// Dependency-free so client components can import it without pulling in Drizzle.

export const lessonCategories = ["praktik", "tajwid", "jazariyah"] as const;
export type LessonCategory = (typeof lessonCategories)[number];

/** Categories shown together under the "Tajwid" menu; praktik has its own pages under /praktik. */
export const materiCategories = ["tajwid", "jazariyah"] as const satisfies readonly LessonCategory[];
export type MateriCategory = (typeof materiCategories)[number];

export const categoryInfo: Record<LessonCategory, { label: string; arabic: string; description: string }> = {
  praktik: { label: "Praktik", arabic: "تَدْرِيب", description: "Latihan membaca huruf hijaiyah dari nol." },
  tajwid: { label: "Tajwid", arabic: "تَجْوِيد", description: "Memahami kaidah bacaan yang benar." },
  jazariyah: { label: "Jazari", arabic: "الْجَزَرِيَّة", description: "Matan Al-Jazariyah bait demi bait." }
};

export function isLessonCategory(value: unknown): value is LessonCategory {
  return lessonCategories.includes(value as LessonCategory);
}

export function isMateriCategory(value: unknown): value is MateriCategory {
  return materiCategories.includes(value as MateriCategory);
}

/** Where a lesson is read: practice drills have their own focused pages. */
export function lessonHref(lesson: { slug: string; category: LessonCategory }) {
  return lesson.category === "praktik" ? `/praktik/${lesson.slug}` : `/belajar/${lesson.slug}`;
}

/** Where a category's lessons are listed. */
export function categoryHref(category: LessonCategory) {
  return category === "praktik" ? "/praktik" : `/belajar?kategori=${category}`;
}

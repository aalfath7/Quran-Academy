import type { MetadataRoute } from "next";
import { getDb } from "@/db";
import { materiCategories, lessonHref } from "@/lib/categories";
import { listLatestLessons } from "@/lib/lessons";
import { PAGE_COUNT } from "@/lib/mushaf";
import { listSurahs } from "@/lib/quran";
import { absoluteUrl } from "@/lib/seo";

// Lessons come from D1, which is only reachable per request on Cloudflare.
export const dynamic = "force-dynamic";

/** Every public, indexable page: about 7,000 URLs, well under the 50,000 a single sitemap may hold. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await getDb();
  const [lessons, surahs] = await Promise.all([listLatestLessons(db, 1000), listSurahs(db)]);

  const entry = (path: string, priority: number, lastModified?: Date): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    priority,
    ...(lastModified && { lastModified })
  });

  return [
    entry("/", 1),
    entry("/daftar", 0.9),
    entry("/tartil", 0.9),
    entry("/ibtida", 0.9),
    entry("/quran", 0.9),
    entry("/tes", 0.6),
    ...materiCategories.map((category) => entry(`/tes/${category}`, 0.5)),
    ...lessons.map((lesson) => entry(lessonHref(lesson), 0.8, lesson.updatedAt)),
    ...surahs.map(({ number }) => entry(`/quran/${number}`, 0.7)),
    ...surahs.flatMap(({ number, ayahCount }) => Array.from({ length: ayahCount }, (_, index) => entry(`/quran/${number}/${index + 1}`, 0.4))),
    ...Array.from({ length: PAGE_COUNT }, (_, index) => entry(`/quran/halaman/${index + 1}`, 0.3))
  ];
}

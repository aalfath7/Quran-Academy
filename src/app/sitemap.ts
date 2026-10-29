import type { MetadataRoute } from "next";
import { getDb } from "@/db";
import { materiCategories, lessonHref } from "@/lib/categories";
import { listLatestLessons } from "@/lib/lessons";
import { absoluteUrl } from "@/lib/seo";

// Lessons come from D1, which is only reachable per request on Cloudflare.
export const dynamic = "force-dynamic";

/** Every public, indexable page. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await getDb();
  const lessons = await listLatestLessons(db, 1000);

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
    entry("/tes", 0.6),
    ...materiCategories.map((category) => entry(`/tes/${category}`, 0.5)),
    ...lessons.map((lesson) => entry(lessonHref(lesson), 0.8, lesson.updatedAt))
  ];
}

import type { MetadataRoute } from "next";
import { materiCategories, lessonHref } from "@/lib/categories";
import { listAllLessons } from "@/lib/lessons";
import { absoluteUrl } from "@/lib/seo";

/** Every public, indexable page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: absoluteUrl(path), priority });

  return [
    entry("/", 1),
    entry("/lanjutan", 0.9),
    entry("/pemula", 0.9),
    entry("/tes", 0.6),
    ...materiCategories.map((category) => entry(`/tes/${category}`, 0.5)),
    ...listAllLessons().map((lesson) => entry(lessonHref(lesson), 0.8))
  ];
}

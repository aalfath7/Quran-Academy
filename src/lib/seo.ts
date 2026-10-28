import type { Metadata } from "next";

// Dependency-free: the site identity and per-page metadata shared by layouts, pages, robots, and the sitemap.

export const SITE_URL = "https://quran-academy.alfath7.workers.dev";
export const SITE_NAME = "Fathway Quran";
export const SITE_TAGLINE = "Belajar Tajwid & Baca Al-Qur'an Online";
export const SITE_DESCRIPTION =
  "Belajar membaca Al-Qur'an dari huruf hijaiyah, kaidah tajwid, dan tes pemahaman, lengkap dengan mushaf, terjemahan, dan tafsir Kemenag RI. Gratis dan bisa diakses kapan saja.";

const ogImage = { url: "/og-image.png", width: 1200, height: 627, alt: `${SITE_NAME} — ${SITE_TAGLINE}` };

/** Open Graph fields every page shares; a page's own openGraph replaces the parent's whole object, so each repeats them. */
export const baseOpenGraph = {
  siteName: SITE_NAME,
  locale: "id_ID",
  type: "website",
  images: [ogImage]
} satisfies Metadata["openGraph"];

/** Search snippets are cut around 160 characters; trims at a word boundary instead of mid-word. */
export function truncate(text: string, max = 160) {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;

  return `${flat.slice(0, flat.lastIndexOf(" ", max - 1)).replace(/[\s,.;:]+$/, "")}…`;
}

/**
 * Title, description, canonical URL, and social cards for one page. The title gets the site name from the root
 * layout's template; social cards carry it themselves because the template does not reach them.
 */
export function pageMetadata({ title, description, path, noIndex }: { title: string; description: string; path: string; noIndex?: boolean }): Metadata {
  const summary = truncate(description);
  const fullTitle = `${title} · ${SITE_NAME}`;

  return {
    title,
    description: summary,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title: fullTitle, description: summary, url: path },
    twitter: { card: "summary_large_image", title: fullTitle, description: summary, images: [ogImage.url] },
    ...(noIndex && { robots: { index: false, follow: true } })
  };
}

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

/** schema.org BreadcrumbList from [name, path] pairs, home first. */
export function breadcrumbJsonLd(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, item: absoluteUrl(path) }))
  };
}

import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Scheherazade_New } from "next/font/google";
import { themeInitScript } from "@/components/theme-toggle";
import { baseOpenGraph, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta"
});

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces"
});

// Scheherazade New stacks the Quranic marks of the Kemenag text (sukun with madd, small high madd, iqlab)
// without them colliding, which Amiri does not.
const arabic = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade"
});

const homeTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: homeTitle, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["belajar Al-Qur'an", "belajar tajwid", "hukum tajwid", "huruf hijaiyah", "tahsin online", "kelas tajwid online", "mushaf online", "tafsir Al-Qur'an", "terjemahan Al-Qur'an Kemenag"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  category: "education",
  formatDetection: { telephone: false },
  openGraph: { ...baseOpenGraph, title: homeTitle, description: SITE_DESCRIPTION, url: "/" },
  twitter: { card: "summary_large_image", title: homeTitle, description: SITE_DESCRIPTION, images: ["/og-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1714" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${sans.variable} ${display.variable} ${arabic.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

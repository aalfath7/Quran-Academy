import type { Metadata } from "next";
import { Amiri, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { themeInitScript } from "@/components/theme-toggle";
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

const arabic = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quran-academy.alfath7.workers.dev"),
  title: "Fathway Quran",
  description: "Belajar Al-Qur'an dengan terarah dan konsisten.",
  openGraph: {
    title: "Fathway Quran",
    description: "Belajar Al-Qur'an dengan terarah dan konsisten.",
    url: "/",
    siteName: "Fathway Quran",
    images: [{ url: "/og-image.png", width: 1200, height: 627 }],
    locale: "id_ID",
    type: "website"
  }
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

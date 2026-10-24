import Link from "next/link";
import { Star } from "./star";

const navLinks = [
  { href: "/quran", label: "Al-Qur'an" },
  { href: "/belajar", label: "Materi" },
  { href: "/belajar?kategori=tilawah", label: "Tilawah" },
  { href: "/belajar?kategori=tajwid", label: "Tajwid" },
  { href: "/belajar?kategori=tahfidz", label: "Tahfidz" }
];

export function SiteHeader() {
  return (
    <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link className="group flex items-center gap-2.5" href="/">
        <Star className="size-8 text-gold transition-transform duration-700 group-hover:rotate-45" />
        <span className="font-display text-xl font-medium tracking-tight text-forest-deep">Quran Academy</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
        {navLinks.map(({ href, label }) => (
          <Link key={href} className="transition hover:text-forest" href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <Link
        className="rounded-full border border-forest/20 bg-paper/60 px-5 py-2.5 text-sm font-medium text-forest-deep backdrop-blur transition hover:border-forest/40 hover:bg-white/70"
        href="/belajar"
      >
        Mulai belajar
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-gold/20 px-6 py-8 text-xs text-ink-soft/70 md:flex-row">
      <span className="flex items-center gap-2">
        <Star className="size-4 text-gold" />
        Quran Academy
      </span>
      <span>Belajar dengan niat baik dan konsisten.</span>
    </footer>
  );
}

export function BackgroundGlow() {
  return (
    <>
      <div className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-gold-soft/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-48 top-[28rem] size-[30rem] rounded-full bg-forest/10 blur-3xl" />
    </>
  );
}

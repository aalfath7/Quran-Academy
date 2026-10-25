import Link from "next/link";
import { StartLearningMenu } from "./start-learning-menu";
import { Star } from "./star";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/quran", label: "Al-Qur'an" },
  { href: "/praktik", label: "Praktik" },
  { href: "/belajar?kategori=tajwid", label: "Tajwid" },
  { href: "/belajar?kategori=jazariyah", label: "Jazari" },
  { href: "/tes", label: "Tes" }
];

export function SiteHeader() {
  return (
    <header className="relative mx-auto flex fullview:hidden max-w-6xl flex-wrap items-center justify-between gap-y-4 px-6 py-6">
      <Link className="group flex items-center gap-2.5" href="/">
        <Star className="size-8 text-gold transition-transform duration-700 group-hover:rotate-45" />
        <span className="font-display text-xl font-medium tracking-tight text-forest-deep">Quran Academy</span>
      </Link>
      {/* Below md the links take their own row under the logo, so the menu stays reachable on phones. */}
      <nav className="order-last flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-gold/20 pt-4 text-sm text-ink-soft md:order-0 md:w-auto md:gap-8 md:border-0 md:pt-0">
        {navLinks.map(({ href, label }) => (
          <Link key={href} className="transition hover:text-forest" href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <StartLearningMenu
          align="right"
          className="hidden sm:block"
          buttonClassName="rounded-full border border-forest/20 bg-paper/60 px-5 py-2.5 text-sm font-medium text-forest-deep backdrop-blur transition hover:border-forest/40 hover:bg-surface/70"
        />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mx-auto flex fullview:hidden max-w-6xl flex-col items-center justify-between gap-3 border-t border-gold/20 px-6 py-8 text-xs text-ink-soft/70 md:flex-row">
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
      <div className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-gold-soft/30 blur-3xl dark:bg-gold-soft/10" />
      <div className="pointer-events-none absolute -left-48 top-[28rem] size-[30rem] rounded-full bg-forest/10 blur-3xl" />
    </>
  );
}

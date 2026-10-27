import { ExternalLink, LogOut } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { requireAdmin } from "@/lib/auth";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin · Fathway Quran"
};

const adminLinks = [
  { href: "/admin", label: "Materi" },
  { href: "/admin/pendaftar", label: "Pendaftar" }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="grain min-h-screen">
      <header className="border-b border-gold/20 bg-paper-deep/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link className="flex items-center gap-2.5" href="/admin">
            <Logo className="size-7 text-forest" />
            <span className="font-display text-lg font-medium text-forest-deep">Fathway Quran</span>
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-soft">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden text-ink-soft sm:inline">{user.email}</span>
            <ThemeToggle />
            <Link
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-ink-soft transition hover:bg-surface/70 hover:text-forest"
              href="/belajar"
              target="_blank"
            >
              <ExternalLink aria-hidden="true" size={15} />
              <span className="hidden sm:inline">Lihat situs</span>
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 px-4 py-2 font-medium text-forest-deep transition hover:border-forest/40 hover:bg-surface/70"
              >
                <LogOut aria-hidden="true" size={15} />
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <nav aria-label="Menu admin" className="mb-10 flex gap-2 text-sm font-medium">
          {adminLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-forest/15 px-4 py-2 text-forest-deep transition hover:border-forest/40 hover:bg-surface/70"
            >
              {label}
            </Link>
          ))}
        </nav>
        {children}
      </main>
    </div>
  );
}

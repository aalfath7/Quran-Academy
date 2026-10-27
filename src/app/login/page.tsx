import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Masuk · Fathway Quran"
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user?.role === "admin") redirect("/admin");

  return (
    <main className="grain relative grid min-h-screen md:grid-cols-[0.9fr_1.1fr]">
      <aside className="pattern-girih relative hidden overflow-hidden bg-brand-deep md:block">
        <div className="absolute inset-0 bg-radial from-brand/50 to-brand-deep" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link className="flex items-center gap-2.5" href="/">
            <Logo className="size-8 text-cream" dotClassName="fill-gold-soft" />
            <span className="font-display text-xl font-medium text-cream">Fathway Quran</span>
          </Link>
          <div>
            <p className="font-arabic text-4xl leading-[2] text-gold-soft" lang="ar" dir="rtl">
              رَبِّ زِدْنِي عِلْمًا
            </p>
            <p className="mt-4 font-display text-lg italic text-cream/80">&ldquo;Ya Tuhanku, tambahkanlah ilmu kepadaku.&rdquo;</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft/70">QS. Taha · 20:114</p>
          </div>
        </div>
      </aside>

      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link className="mb-12 flex items-center gap-2.5 md:hidden" href="/">
            <Logo className="size-8 text-forest" />
            <span className="font-display text-xl font-medium text-forest-deep">Fathway Quran</span>
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Panel admin</p>
          <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-forest-deep">Assalamu&apos;alaikum.</h1>
          <p className="mb-10 mt-3 text-ink-soft">Masuk untuk mengelola materi belajar.</p>
          <LoginForm />
          <Link className="mt-8 inline-block text-sm text-ink-soft transition hover:text-forest" href="/">
            ← Kembali ke beranda
          </Link>
        </div>
      </section>
    </main>
  );
}

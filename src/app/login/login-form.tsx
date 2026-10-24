"use client";

import { LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const inputClass =
  "mt-2 w-full rounded-2xl border border-forest/15 bg-surface/70 px-4 py-3.5 text-ink outline-none transition placeholder:text-ink-soft/40 focus:border-gold focus:bg-surface focus:ring-4 focus:ring-gold-soft/30";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className="text-sm font-medium text-forest-deep">Email</span>
        <input
          className={inputClass}
          type="email"
          name="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          placeholder="admin@contoh.com"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-forest-deep">Password</span>
        <input className={inputClass} type="password" name="password" autoComplete="current-password" required />
      </label>

      {state.error && (
        <p role="alert" className="rounded-2xl border border-red-800/15 bg-red-50 px-4 py-3 text-sm text-red-900">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:bg-brand-deep disabled:opacity-70"
      >
        {pending && <LoaderCircle aria-hidden="true" size={16} className="animate-spin" />}
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}

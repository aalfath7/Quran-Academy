"use client";

import { Trash2 } from "lucide-react";
import { removeRegistration } from "../actions";

export function DeleteRegistrationButton({ id, name, withLabel = false }: { id: string; name: string; withLabel?: boolean }) {
  return (
    <form
      action={removeRegistration}
      onSubmit={(event) => {
        if (!window.confirm(`Hapus pendaftar "${name}"? Tindakan ini tidak bisa dibatalkan.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={
          withLabel
            ? "inline-flex items-center gap-2 rounded-full border border-red-800/20 px-5 py-3 text-sm font-medium text-red-800 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/40"
            : "inline-flex size-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-red-50 hover:text-red-800"
        }
        aria-label={withLabel ? undefined : `Hapus ${name}`}
      >
        <Trash2 aria-hidden="true" size={16} />
        {withLabel && "Hapus pendaftar"}
      </button>
    </form>
  );
}

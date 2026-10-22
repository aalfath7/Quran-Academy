"use client";

import { Trash2 } from "lucide-react";
import { removeLesson } from "./actions";

export function DeleteLessonButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={removeLesson}
      onSubmit={(event) => {
        if (!window.confirm(`Hapus materi "${title}"? Tindakan ini tidak bisa dibatalkan.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex size-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-red-50 hover:text-red-800"
        aria-label={`Hapus ${title}`}
      >
        <Trash2 aria-hidden="true" size={16} />
      </button>
    </form>
  );
}

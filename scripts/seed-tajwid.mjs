// Memasukkan materi praktik dasar bacaan, tajwid dasar (level satu), dan syarah Al-Jazariyah ke tabel lessons.
//
//   npm run lessons:seed            (local D1)
//   npm run lessons:seed -- --remote (remote D1)
//
// Aman dijalankan ulang: materi dengan slug yang sama diperbarui, status publish-nya tidak diubah.
// Praktik dari versi lama Bagian 1 (obsoleteSlugs) dihapus.

import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { lessons as jazariyah } from "./data/jazariyah.mjs";
import { lessons as praktikBagian2 } from "./data/praktik-bagian-2.mjs";
import { lessons as praktikBagian3 } from "./data/praktik-bagian-3.mjs";
import { lessons as praktikBagian4 } from "./data/praktik-bagian-4.mjs";
import { obsoleteSlugs, lessons as praktikDasar } from "./data/praktik-dasar.mjs";
import { lessons as tajwidRingkas } from "./data/tajwid-ringkas.mjs";

const lessons = [...praktikDasar, ...praktikBagian2, ...praktikBagian3, ...praktikBagian4, ...tajwidRingkas, ...jazariyah];

const remote = process.argv.includes("--remote");

// Same limits as lessonInputSchema in src/lib/lessons.ts.
for (const lesson of lessons) {
  const problems = [
    lesson.title.length < 3 || lesson.title.length > 120 ? "judul" : null,
    lesson.summary.length < 10 || lesson.summary.length > 300 ? "ringkasan" : null,
    lesson.content.length < 20 ? "isi" : null,
    !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(lesson.slug) || lesson.slug.length > 80 ? "slug" : null
  ].filter(Boolean);
  if (problems.length) {
    console.error(`Materi "${lesson.slug}" tidak valid: ${problems.join(", ")}.`);
    process.exit(1);
  }
}

const quote = (value) => (value == null ? "NULL" : `'${value.replaceAll("'", "''")}'`);

const removeObsolete = `
DELETE FROM lessons WHERE category = 'praktik' AND slug IN (${obsoleteSlugs.map(quote).join(", ")});`;

const sql = [removeObsolete]
  .concat(
    lessons.map(
      (lesson) => `
INSERT INTO lessons (id, slug, title, category, summary, arabic_text, content, position, published)
VALUES (${quote(crypto.randomUUID())}, ${quote(lesson.slug)}, ${quote(lesson.title)}, ${quote(lesson.category)},
  ${quote(lesson.summary)}, ${quote(lesson.arabicText)}, ${quote(lesson.content)}, ${lesson.position}, 1)
ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  category = excluded.category,
  summary = excluded.summary,
  arabic_text = excluded.arabic_text,
  content = excluded.content,
  position = excluded.position,
  updated_at = (unixepoch() * 1000);`
    )
  )
  .join("\n");

const dir = mkdtempSync(join(tmpdir(), "quran-academy-"));
const file = join(dir, "seed-tajwid.sql");
writeFileSync(file, sql);

try {
  const result = spawnSync(`npx wrangler d1 execute DB ${remote ? "--remote" : "--local"} --file "${file}"`, {
    stdio: "inherit",
    shell: true
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`\n${lessons.length} materi tersimpan (${remote ? "remote" : "lokal"}).`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}

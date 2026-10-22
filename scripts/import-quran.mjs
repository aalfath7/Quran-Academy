// Mengimpor Al-Qur'an (teks Arab, latin, terjemahan, dan tafsir Kemenag) ke tabel surahs dan ayahs.
// Sumber data: dataset Kaggle "ronnieaban/alquran" (berkas surah.csv).
//
//   npm run quran:import -- path/ke/surah.csv            (local D1)
//   npm run quran:import -- path/ke/surah.csv --remote   (remote D1)
//
// Aman dijalankan ulang: surah dan ayat yang sudah ada diperbarui.

import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const remote = process.argv.includes("--remote");
const csvPath = process.argv.slice(2).find((arg) => !arg.startsWith("--"));

if (!csvPath) {
  console.error("Sertakan path ke surah.csv, misalnya: npm run quran:import -- ./data/surah.csv");
  process.exit(1);
}

// RFC 4180 parser: quoted fields may contain commas, quotes ("") and newlines.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

const [header, ...records] = parseCsv(readFileSync(csvPath, "utf8").replace(/^﻿/, ""));
const rows = records
  .filter((record) => record.length === header.length)
  .map((record) => Object.fromEntries(header.map((name, i) => [name, record[i].trim()])));

const surahs = new Map();
const ayahs = rows.map((row) => {
  const surahNumber = Number(row.surah_id);
  if (!surahs.has(surahNumber)) {
    surahs.set(surahNumber, {
      number: surahNumber,
      nameArabic: row.surah_arabic,
      nameLatin: row.surah_latin,
      transliteration: row.surah_transliteration,
      translation: row.surah_translation,
      ayahCount: Number(row.surah_num_ayah),
      location: row.surah_location,
      page: Number(row.surah_page),
      introduction: row.tafsir_intro_surah || null
    });
  }

  return {
    id: Number(row.id),
    surahNumber,
    number: Number(row.ayah),
    juz: Number(row.juz),
    page: Number(row.page),
    arabic: row.arabic,
    latin: row.latin,
    translation: row.translation,
    footnotes: row.footnotes || null,
    tafsirWajiz: row.tafsir_wajiz || null,
    tafsirTahlili: row.tafsir_tahlili || null
  };
});

// Refuse partial or malformed data rather than importing half a mushaf.
const problems = [];
if (surahs.size !== 114) problems.push(`jumlah surah ${surahs.size}, seharusnya 114`);
if (ayahs.length !== 6236) problems.push(`jumlah ayat ${ayahs.length}, seharusnya 6236`);
for (const surah of surahs.values()) {
  const count = ayahs.filter(({ surahNumber }) => surahNumber === surah.number).length;
  if (count !== surah.ayahCount) problems.push(`surah ${surah.number} berisi ${count} ayat, seharusnya ${surah.ayahCount}`);
  if (!["Makkiyah", "Madaniyah"].includes(surah.location)) problems.push(`surah ${surah.number}: lokasi "${surah.location}"`);
}
for (const ayah of ayahs) {
  if (![ayah.id, ayah.number, ayah.juz, ayah.page].every(Number.isInteger) || !ayah.arabic || !ayah.translation) {
    problems.push(`ayat ${ayah.surahNumber}:${ayah.number} tidak lengkap`);
  }
}
if (problems.length) {
  console.error(`Data tidak valid:\n- ${problems.slice(0, 20).join("\n- ")}`);
  process.exit(1);
}

const quote = (value) =>
  value == null ? "NULL" : typeof value === "number" ? String(value) : `'${value.replaceAll("'", "''")}'`;

function upsert(table, key, values) {
  const columns = Object.keys(values).map((name) => name.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`));
  const updates = columns.filter((column) => column !== key).map((column) => `${column} = excluded.${column}`);

  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${Object.values(values).map(quote).join(", ")})
ON CONFLICT(${key}) DO UPDATE SET ${updates.join(", ")};`;
}

// Split into several files so each wrangler call stays well within D1 import limits.
const chunks = [[...surahs.values()].map((surah) => upsert("surahs", "number", surah))];
for (let i = 0; i < ayahs.length; i += 800) {
  chunks.push(ayahs.slice(i, i + 800).map((ayah) => upsert("ayahs", "id", ayah)));
}

const dir = mkdtempSync(join(tmpdir(), "quran-academy-"));

try {
  for (const [index, statements] of chunks.entries()) {
    const file = join(dir, `quran-${index}.sql`);
    writeFileSync(file, statements.join("\n"));
    console.log(`Bagian ${index + 1} dari ${chunks.length}…`);
    // Wrangler echoes a result per statement, so its output is only shown on failure.
    const result = spawnSync(`npx wrangler d1 execute DB ${remote ? "--remote" : "--local"} --file "${file}" --yes`, {
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
      shell: true
    });
    if (result.status !== 0) {
      process.stderr.write(`${result.stdout ?? ""}${result.stderr ?? ""}`);
      process.exit(result.status ?? 1);
    }
  }
  console.log(`\n${surahs.size} surah dan ${ayahs.length} ayat tersimpan (${remote ? "remote" : "lokal"}).`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}

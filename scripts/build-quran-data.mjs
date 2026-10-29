// Menyusun src/data/quran.json: teks Arab ayat-ayat yang dipakai kelas Lanjutan (latihan ayat dan halaman praktik
// mushaf di src/data/tajwid-pertemuan.ts), dari teks Kemenag pada dataset Kaggle "ronnieaban/alquran" (surah.csv).
//
//   npm run quran:build -- path/ke/surah.csv
//
// Jalankan ulang setelah mengubah latihan ayat atau halaman mushaf di materi Lanjutan.

import { readFileSync, writeFileSync } from "node:fs";

const csvPath = process.argv[2];
const meetingsPath = new URL("../src/data/tajwid-pertemuan.ts", import.meta.url);
const outputPath = new URL("../src/data/quran.json", import.meta.url);

if (!csvPath) {
  console.error("Sertakan path ke surah.csv, misalnya: npm run quran:build -- ./alquran/surah.csv");
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
      nameArabic: row.surah_arabic,
      nameLatin: row.surah_latin,
      ayahCount: Number(row.surah_num_ayah),
      location: row.surah_location
    });
  }

  return {
    id: Number(row.id),
    surahNumber,
    number: Number(row.ayah),
    juz: Number(row.juz),
    page: Number(row.page),
    arabic: row.arabic
  };
});

// Refuse partial or malformed data rather than writing half a mushaf.
const problems = [];
if (surahs.size !== 114) problems.push(`jumlah surah ${surahs.size}, seharusnya 114`);
if (ayahs.length !== 6236) problems.push(`jumlah ayat ${ayahs.length}, seharusnya 6236`);
for (const ayah of ayahs) {
  if (![ayah.id, ayah.number, ayah.juz, ayah.page].every(Number.isInteger) || !ayah.arabic) {
    problems.push(`ayat ${ayah.surahNumber}:${ayah.number} tidak lengkap`);
  }
}
if (problems.length) {
  console.error(`Data tidak valid:\n- ${problems.slice(0, 20).join("\n- ")}`);
  process.exit(1);
}

// Same line formats as src/lib/meeting-plan.ts: "Praktik mushaf: 603–604" and "1:2 | kata | catatan".
const meetings = readFileSync(meetingsPath, "utf8");
const pages = new Set();
for (const [, from, to = from] of meetings.matchAll(/^Praktik mushaf:\s*(\d{1,3})(?:\s*[–-]\s*(\d{1,3}))?\.?$/gm)) {
  for (let page = Number(from); page <= Number(to); page++) pages.add(page);
}
const drills = new Set([...meetings.matchAll(/^(\d{1,3}):(\d{1,3})\s*\|/gm)].map(([, surah, ayah]) => `${Number(surah)}:${Number(ayah)}`));

const used = ayahs.filter((ayah) => pages.has(ayah.page) || drills.has(`${ayah.surahNumber}:${ayah.number}`));
const missing = [...drills].filter((ref) => !used.some(({ surahNumber, number }) => `${surahNumber}:${number}` === ref));
if (missing.length) {
  console.error(`Ayat latihan tidak ditemukan: ${missing.join(", ")}`);
  process.exit(1);
}

const usedSurahs = Object.fromEntries([...new Set(used.map(({ surahNumber }) => surahNumber))].map((number) => [number, surahs.get(number)]));
writeFileSync(outputPath, `${JSON.stringify({ surahs: usedSurahs, ayahs: used }, null, 1)}
`);
console.log(`${used.length} ayat dari ${pages.size} halaman mushaf dan ${drills.size} ayat latihan tersimpan di src/data/quran.json.`);

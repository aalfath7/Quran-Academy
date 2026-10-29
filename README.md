# Fathway Quran

Fathway Quran is a Next.js application deployed to Cloudflare Workers with the OpenNext adapter. It has two classes, Pemula (for learners who cannot read the Qur'an yet, from the first letters) and Lanjutan (a 26-meeting tajwid class for learners who can read but not yet fluently), plus a tajwid quiz. All content is static data in the repository; there is no database, admin area, or sign-up, and learner progress lives in the browser's localStorage.

## Requirements

- Node.js 22.12+, 24.x, or 26+
- npm
- Cloudflare account for deployment

## Local setup

```sh
npm install
npm run dev
```

## Content

Lessons live in `src/data/` and are read through `src/lib/lessons.ts`:

- `praktik-dasar.ts`, `praktik-bagian-2.ts`, `praktik-bagian-3.ts`, `praktik-bagian-4.ts`: the 39 Pemula practices (`/pemula/[slug]`).
- `tajwid-pertemuan.ts`: the 26 Lanjutan meetings (`/lanjutan/[slug]`); the format is described in `src/lib/meeting-plan.ts`.
- `src/lib/quiz-data/`: the questions for `/tes`.

Every lesson page is prerendered at build time, so editing a file in `src/data/` and deploying is all it takes to publish a change.

## Al-Qur'an

The Lanjutan meetings show the full text of each drilled ayah and the mushaf pages they practise on. `src/data/quran.json` holds only those ayahs, taken from the Kementerian Agama RI text in the Kaggle dataset [ronnieaban/alquran](https://www.kaggle.com/datasets/ronnieaban/alquran).

After changing a meeting's `Latihan ayat` lines or `Praktik mushaf` pages, rebuild the file from the dataset's `surah.csv`:

```sh
curl -L -o alquran.zip https://www.kaggle.com/api/v1/datasets/download/ronnieaban/alquran
mkdir alquran && tar -xf alquran.zip -C alquran

npm run quran:build -- alquran/surah.csv
```

The script checks that all 114 surahs and 6,236 ayahs are present and that every drilled ayah exists before writing anything.

## Verification

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

## Cloudflare deployment

`wrangler.jsonc` configures the OpenNext Worker and static assets. `npm run preview` builds and runs the Worker locally; `npm run deploy` builds and deploys it.

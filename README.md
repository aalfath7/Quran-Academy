# Fathway Quran

Fathway Quran is a Next.js application prepared for Cloudflare Workers and D1. The first database migration establishes user and profile tables; all application database access goes through Drizzle and the Workers `DB` binding.

## Requirements

- Node.js 22.12+, 24.x, or 26+
- npm
- Cloudflare account for remote database creation and deployment

## Compatibility references

- [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare): Next.js 16 support, `getCloudflareContext()`, and local binding setup.
- [Drizzle Cloudflare D1 driver](https://orm.drizzle.team/docs/connect-cloudflare-d1): Drizzle ORM access through a D1 binding.
- [Cloudflare Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/): test bindings in the Workers runtime.
- [Cloudflare D1 Wrangler commands](https://developers.cloudflare.com/d1/wrangler-commands/): local and remote D1 migration commands.

## Local setup

```sh
npm install
npm run cf-typegen
npm run db:generate
npm run db:migrate:local
npm run dev
```

Run `npm run cf-typegen` again after changing the Wrangler bindings; its generated declarations are intentionally not committed.

Next.js development uses the local D1 emulator through the OpenNext Cloudflare integration in `next.config.ts`. To exercise the application in the Workers runtime, run `npm run preview`.
The read-only `/api/health` endpoint performs a D1 query through the Workers binding and returns a generic connection status.

## Admin and lessons

Admins sign in at `/login` and manage lessons (tilawah, tajwid, tahfidz) at `/admin`. Published lessons appear at `/tartil`.

There is no public sign-up. Create an admin, or reset an existing admin's password, with:

```sh
npm run admin:create -- admin@example.com            # local D1
npm run admin:create -- admin@example.com --remote   # remote D1
```

The script prompts for the password (or reads `ADMIN_PASSWORD`). Passwords are stored as PBKDF2-SHA256 hashes; sessions are stored in D1 as SHA-256 hashes of an HttpOnly cookie token, and resetting a password signs that admin out everywhere.

## Al-Qur'an

There is no standalone Qur'an reader (old `/quran` links redirect home). The Tartil lessons (`/tartil/[slug]`) show the full text of each drilled ayah and the mushaf pages they practise on, read from the Kementerian Agama RI text via the Kaggle dataset [ronnieaban/alquran](https://www.kaggle.com/datasets/ronnieaban/alquran).

The data lives in the `surahs` and `ayahs` D1 tables and is not committed. Download the dataset (it contains a single `surah.csv`) and import it:

```sh
curl -L -o alquran.zip https://www.kaggle.com/api/v1/datasets/download/ronnieaban/alquran
mkdir alquran && tar -xf alquran.zip -C alquran

npm run quran:import -- alquran/surah.csv            # local D1
npm run quran:import -- alquran/surah.csv --remote   # remote D1
```

`kagglehub.dataset_download("ronnieaban/alquran")` in Python downloads the same file. The import checks that all 114 surahs and 6,236 ayahs are present before writing anything, and can be re-run; existing rows are updated.

## Database

The schema is in `src/db/schema.ts`; generated SQL migrations are stored in `drizzle/`.

- `npm run db:generate` generates a migration from the Drizzle schema.
- `npm run db:migrate:local` applies migrations to local D1.
- `npm run db:migrate:remote` applies migrations to the configured remote D1.
- `npm run db:studio` opens Drizzle Studio.

The placeholder `database_id` in `wrangler.jsonc` is for local development only. Before using a remote database:

1. Create it with `npx wrangler d1 create quran-academy`.
2. Put the returned database ID in `wrangler.jsonc`.
3. Apply migrations with `npm run db:migrate:remote`.
4. Deploy with `npm run deploy`.

The application obtains the D1 binding from `getCloudflareContext()` in `src/db/index.ts`; it does not connect through an external database URL.

## Verification

`npm test` runs a Cloudflare Workers Vitest integration test against an isolated local D1 database. The test applies the checked-in SQL migrations and inserts and reads a user through the same Drizzle database layer used by the application.

Other checks:

```sh
npm run lint
npm run typecheck
npm run build
```

## Cloudflare deployment

`wrangler.jsonc` configures the OpenNext Worker, static assets, and D1 binding. `npm run preview` builds and runs the Worker locally; `npm run deploy` builds and deploys it. A remote database ID and Cloudflare authentication are required for production deployment. No production deployment has been performed as part of this setup.

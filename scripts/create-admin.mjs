// Creates an admin account, or resets the password of an existing one.
//
//   npm run admin:create -- admin@example.com            (local D1)
//   npm run admin:create -- admin@example.com --remote   (remote D1)
//
// The password is prompted for; set ADMIN_PASSWORD to run non-interactively.

import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { hashPassword } from "../src/lib/password.ts";

const args = process.argv.slice(2);
const remote = args.includes("--remote");
const email = args.find((arg) => !arg.startsWith("--"))?.trim().toLowerCase();

// Quotes are excluded so the address can be embedded in SQL safely.
if (!email || !/^[^\s@'"\\]+@[^\s@'"\\]+\.[^\s@'"\\]+$/.test(email)) {
  console.error("Usage: npm run admin:create -- <email> [--remote]");
  process.exit(1);
}

function ask(question, hidden) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      rl._writeToOutput = (text) => {
        if (text.includes(question)) process.stdout.write(question);
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write("\n");
      resolve(answer);
    });
  });
}

let password = process.env.ADMIN_PASSWORD;
if (!password) {
  password = await ask("Password (min. 8 karakter): ", true);
  if ((await ask("Ulangi password: ", true)) !== password) {
    console.error("Password tidak sama.");
    process.exit(1);
  }
}
if (password.length < 8) {
  console.error("Password minimal 8 karakter.");
  process.exit(1);
}

const passwordHash = await hashPassword(password);
const sql = `
INSERT INTO users (id, email, role, password_hash)
VALUES ('${crypto.randomUUID()}', '${email}', 'admin', '${passwordHash}')
ON CONFLICT(email) DO UPDATE SET
  role = 'admin',
  password_hash = excluded.password_hash,
  updated_at = (unixepoch() * 1000);
DELETE FROM sessions WHERE user_id = (SELECT id FROM users WHERE email = '${email}');
`;

const dir = mkdtempSync(join(tmpdir(), "quran-academy-"));
const file = join(dir, "create-admin.sql");
writeFileSync(file, sql);

try {
  const result = spawnSync(`npx wrangler d1 execute DB ${remote ? "--remote" : "--local"} --file "${file}"`, {
    stdio: "inherit",
    shell: true
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`\nAdmin ${email} siap (${remote ? "remote" : "lokal"}). Masuk di /login.`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}

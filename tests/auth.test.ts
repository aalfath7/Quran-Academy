import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import { sessions, users } from "../src/db/schema";
import { hashPassword, verifyPassword } from "../src/lib/password";
import { createSession, deleteSession, findSessionUser } from "../src/lib/sessions";

async function insertAdmin(email: string) {
  const db = createDb(env.DB);
  const id = crypto.randomUUID();
  await db.insert(users).values({ id, email, role: "admin", passwordHash: await hashPassword("rahasia123") });

  return { db, id };
}

describe("password hashing", () => {
  it("verifies the right password and rejects others", async () => {
    const hash = await hashPassword("bismillah-123");

    expect(hash).toMatch(/^pbkdf2\$100000\$/);
    expect(await verifyPassword("bismillah-123", hash)).toBe(true);
    expect(await verifyPassword("bismillah-124", hash)).toBe(false);
  });

  it("salts each hash", async () => {
    expect(await hashPassword("same")).not.toBe(await hashPassword("same"));
  });

  it("rejects malformed stored hashes", async () => {
    expect(await verifyPassword("x", "plain-text")).toBe(false);
  });
});

describe("sessions", () => {
  it("resolves a token to its user and stores only a hash", async () => {
    const { db, id } = await insertAdmin("session@example.test");
    const { token } = await createSession(db, id);

    expect(await findSessionUser(db, token)).toEqual({ id, email: "session@example.test", role: "admin" });

    const [stored] = await db.select().from(sessions).where(eq(sessions.userId, id));
    expect(stored.id).not.toBe(token);
  });

  it("ignores unknown, expired and deleted sessions", async () => {
    const { db, id } = await insertAdmin("expired@example.test");
    const { token } = await createSession(db, id);

    expect(await findSessionUser(db, "not-a-token")).toBeNull();

    await db.update(sessions).set({ expiresAt: new Date(Date.now() - 1000) }).where(eq(sessions.userId, id));
    expect(await findSessionUser(db, token)).toBeNull();

    const fresh = await createSession(db, id);
    await deleteSession(db, fresh.token);
    expect(await findSessionUser(db, fresh.token)).toBeNull();
  });
});

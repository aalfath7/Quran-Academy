import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import { createDb } from "../src/db/connection";
import { users } from "../src/db/schema";

describe("Cloudflare D1 database", () => {
  it("persists and reads a user through Drizzle", async () => {
    const db = createDb(env.DB);
    const user = {
      id: crypto.randomUUID(),
      email: "d1-integration@example.test",
      role: "user" as const
    };

    await db.insert(users).values(user);

    const [storedUser] = await db
      .select({ id: users.id, email: users.email, role: users.role })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    expect(storedUser).toEqual(user);
  });
});

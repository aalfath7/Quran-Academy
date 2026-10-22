import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, verifyPassword } from "./password";
import { createSession, deleteSession, findSessionUser } from "./sessions";

const SESSION_COOKIE = "qa_session";

// Compared against when the email is unknown, so both paths take similar time.
let dummyHash: Promise<string> | undefined;
const getDummyHash = () => (dummyHash ??= hashPassword("not-a-real-password"));

export async function signIn(email: string, password: string) {
  const db = await getDb();
  const [user] = await db
    .select({ id: users.id, role: users.role, passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.email, email.trim().toLowerCase()))
    .limit(1);

  const valid = await verifyPassword(password, user?.passwordHash ?? (await getDummyHash()));
  if (!user?.passwordHash || !valid) return false;

  const { token, expiresAt } = await createSession(db, user.id);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt
  });

  return true;
}

export async function signOut() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) await deleteSession(await getDb(), token);
  cookieStore.delete(SESSION_COOKIE);
}

export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  return findSessionUser(await getDb(), token);
});

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (user?.role !== "admin") redirect("/login");

  return user;
}

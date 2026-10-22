import { sql } from "drizzle-orm";
import { getDb } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await getDb();
  await db.run(sql`SELECT 1`);

  return Response.json({ status: "ok", database: "connected" });
}

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createDb } from "./connection";

export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });

  return createDb(env.DB);
}

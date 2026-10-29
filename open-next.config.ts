import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The site is fully static, so prerendered pages (and their RSC payloads) are served from Workers static assets
// instead of being re-rendered by the worker on every request and prefetch.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true
});

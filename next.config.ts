import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Ibtida and Tartil used to live at /praktik and /belajar; old links and bookmarks keep working (query strings carry over).
  async redirects() {
    return [
      { source: "/praktik", destination: "/ibtida", permanent: true },
      { source: "/praktik/:slug*", destination: "/ibtida/:slug*", permanent: true },
      { source: "/belajar", destination: "/tartil", permanent: true },
      { source: "/belajar/:slug*", destination: "/tartil/:slug*", permanent: true }
    ];
  }
};

export default nextConfig;

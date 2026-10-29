import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Pemula and Lanjutan used to live at /ibtida and /tartil, and before that at /praktik and /belajar; old links and
  // bookmarks keep working (query strings carry over).
  async redirects() {
    return [
      ...["/ibtida", "/praktik"].flatMap((source) => [
        { source, destination: "/pemula", permanent: true },
        { source: `${source}/:slug*`, destination: "/pemula/:slug*", permanent: true }
      ]),
      ...["/tartil", "/belajar"].flatMap((source) => [
        { source, destination: "/lanjutan", permanent: true },
        { source: `${source}/:slug*`, destination: "/lanjutan/:slug*", permanent: true }
      ]),
      // The standalone Qur'an reader is gone; its ayahs and pages live on inside the Lanjutan lessons.
      { source: "/quran", destination: "/", permanent: false },
      { source: "/quran/:path*", destination: "/", permanent: false },
      // Online class sign-up and the admin area were removed; the lessons are now static.
      { source: "/daftar", destination: "/", permanent: false },
      { source: "/admin/:path*", destination: "/", permanent: false },
      { source: "/login", destination: "/", permanent: false }
    ];
  }
};

export default nextConfig;

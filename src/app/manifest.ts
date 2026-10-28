import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Fathway",
    description: SITE_DESCRIPTION,
    lang: "id",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f2e8",
    theme_color: "#0d4a3a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "512x512", type: "image/png" }
    ]
  };
}

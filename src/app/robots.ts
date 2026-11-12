import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/src/lib/site";

// Everything public is crawlable, AI crawlers included; API routes are not
// pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}

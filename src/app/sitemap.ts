import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/src/lib/site";

// Only real content changes should move `lastModified`, so dates are set by
// hand when a page's content changes (legal pages: their "Last updated" date).
// priority/changeFrequency are left out on purpose: Google ignores them.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-11-12"),
      images: [absoluteUrl("/opengraph-image.png")],
    },
    {
      url: absoluteUrl("/satoshi-to-usd-and-lkr-converter"),
      lastModified: new Date("2026-11-12"),
    },
    {
      url: absoluteUrl("/brand"),
      lastModified: new Date("2026-11-11"),
      images: [
        absoluteUrl("/assets/brand/kit/01-Primary-Logo/BDLogo_White.png"),
        absoluteUrl("/assets/brand/kit/06-On-Orange/BD_OrangeBG_Black.png"),
      ],
    },
    { url: absoluteUrl("/about"), lastModified: new Date("2026-11-12") },
    { url: absoluteUrl("/news") },
    { url: absoluteUrl("/community"), lastModified: new Date("2026-11-12") },
    { url: absoluteUrl("/releases") },
    { url: absoluteUrl("/terms"), lastModified: new Date("2026-11-09") },
    { url: absoluteUrl("/privacy-policy"), lastModified: new Date("2026-11-12") },
    { url: absoluteUrl("/return-policy"), lastModified: new Date("2026-11-09") },
    { url: absoluteUrl("/license"), lastModified: new Date("2026-11-12") },
  ];
}

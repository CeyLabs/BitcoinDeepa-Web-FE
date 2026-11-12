import type { Metadata } from "next";
import { pageMetadata } from "@/src/lib/seo";

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = pageMetadata({
  title: "Release Notes",
  description:
    "Release notes for the Bitcoin Deepa website, BitcoinDeepaBot and Telegram mini app: new features, improvements and fixes from Sri Lanka's Bitcoin community.",
  path: "/releases",
});

export default function ReleasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

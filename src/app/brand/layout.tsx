import type { Metadata } from "next";
import { pageMetadata } from "@/src/lib/seo";

// Brand fonts (Ubuntu, Nunito Sans, Noto Sans Sinhala) come from the root layout.

const OG_IMAGE = "/assets/brand/kit/06-On-Orange/BD_OrangeBG_Black.png";

export const metadata: Metadata = pageMetadata({
  title: "Brand Guidelines",
  description:
    "Official Bitcoin Deepa brand guidelines and assets: logo, Yaka symbol, app icon, colours, typography, patterns and voice.",
  path: "/brand",
  keywords: [
    "Bitcoin Deepa",
    "brand guidelines",
    "press kit",
    "brand assets",
    "logo download",
    "Yaka",
    "Pearl of Satoshi",
  ],
  openGraph: {
    images: [
      {
        url: OG_IMAGE,
        width: 2400,
        height: 2400,
        alt: "Bitcoin Deepa logo on Satoshi Orange",
      },
    ],
  },
  twitter: { card: "summary", images: [OG_IMAGE] },
});

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return children;
}

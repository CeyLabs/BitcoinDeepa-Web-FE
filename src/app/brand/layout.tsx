import type { Metadata } from "next";
import { Noto_Sans_Sinhala, Nunito_Sans, Ubuntu } from "next/font/google";

// The brand's own typefaces, loaded only on this route for the type specimens.
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-brand-display",
  display: "swap",
  preload: false,
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-brand-body",
  display: "swap",
  preload: false,
});

const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "700"],
  variable: "--font-brand-si",
  display: "swap",
  preload: false,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.bitcoindeepa.com";
const TITLE = "Brand Guidelines | Bitcoin Deepa";
const DESCRIPTION =
  "Official Bitcoin Deepa brand guidelines and assets: logo, Yaka symbol, app icon, colours, typography, patterns and voice.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/brand`,
    siteName: "Bitcoin Deepa",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/assets/brand/kit/06-On-Orange/BD_OrangeBG_Black.png`,
        width: 2400,
        height: 2400,
        alt: "Bitcoin Deepa logo on Satoshi Orange",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${BASE_URL}/assets/brand/kit/06-On-Orange/BD_OrangeBG_Black.png`],
  },
  alternates: {
    canonical: `${BASE_URL}/brand`,
  },
};

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${ubuntu.variable} ${nunitoSans.variable} ${notoSinhala.variable}`}>
      {children}
    </div>
  );
}

import type React from "react";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_Sinhala, Nunito_Sans, Ubuntu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import LenisProvider from "@/src/components/lenis-provider";
import { BrandProvider } from "@/src/components/brand-provider";
import FacebookPixel from "@/src/components/facebook-pixel";
import { JsonLd } from "@/src/components/seo/json-ld";
import {
  absoluteUrl,
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/src/lib/site";

// Brand typefaces (Bitcoin Deepa brand guidelines v1.0, "Typography"):
// Ubuntu is the primary site font, Nunito Sans the secondary (`font-secondary`),
// Noto Sans Sinhala for Sinhala.
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth", "opsz"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "700"],
  variable: "--font-noto-sinhala",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  keywords: [
    "Bitcoin",
    "Sri Lanka",
    "Bitcoin Sri Lanka",
    "Bitcoin Community",
    "Bitcoin Education",
    "Bitcoin Events",
    "Bitcoin Resources",
    "Bitcoin Wallets",
    "Pearl of Satoshi",
    "Bitcoin Deepa",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // The image itself comes from src/app/opengraph-image.png (file convention).
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pearlofsatoshi",
    creator: "@pearlofsatoshi",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["Bitcoin දීප", "Pearl of Satoshi"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/bitcoindeepa-logo.png"),
        width: 640,
        height: 640,
      },
      description: SITE_DESCRIPTION,
      email: CONTACT_EMAIL,
      areaServed: { "@type": "Country", name: "Sri Lanka" },
      sameAs: Object.values(SOCIAL_LINKS),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en-LK",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ubuntu.variable} ${nunitoSans.variable} ${notoSinhala.variable} font-sans antialiased`}
      >
        <JsonLd data={ORGANIZATION_JSON_LD} />
        <FacebookPixel />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <BrandProvider>
            <LenisProvider>
              <Navbar />
              {children}
              <Footer />
            </LenisProvider>
          </BrandProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

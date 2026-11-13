import type React from "react";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_Sinhala, Nunito_Sans, Ubuntu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import LenisProvider from "@/src/components/lenis-provider";
import { BrandProvider } from "@/src/components/brand-provider";
import { ConsentBanner, ConsentDialog, ConsentRoot, ConsentTheme } from "c15t/next";
import { JsonLd } from "@/src/components/seo/json-ld";
import { consentTheme } from "@/src/lib/consent-theme";
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

// Only Ubuntu (every heading, the hero) is preloaded. The secondary font
// (form fields) and Sinhala load on first use instead of competing with the
// hero on the critical path; `swap` means text never waits for them.
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth", "opsz"],
  variable: "--font-nunito-sans",
  display: "swap",
  preload: false,
});

const notoSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "700"],
  variable: "--font-noto-sinhala",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Brand app icon. Tabs: the large-glyph cut (the guidelines' choice for 48px
  // and below) with rounded corners baked in, since tabs don't mask icons;
  // white tile in light tabs, Cold Storage Charcoal in dark. favicon.ico
  // (src/app) is the same artwork for browsers that ignore `media`.
  // Home screen: the standard cut, square, because iOS applies its own mask.
  icons: {
    icon: [
      { url: "/icons/favicon-light.png", type: "image/png", sizes: "64x64", media: "(prefers-color-scheme: light)" },
      { url: "/icons/favicon-dark.png", type: "image/png", sizes: "64x64", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
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
    <html
      lang="en"
      suppressHydrationWarning
      // Font variables live on <html> so Tailwind's theme (defined on :root)
      // can resolve var(--font-ubuntu) etc.
      className={`${ubuntu.variable} ${nunitoSans.variable} ${notoSinhala.variable}`}
    >
      <body className="font-sans antialiased">
        <JsonLd data={ORGANIZATION_JSON_LD} />
        {/* Consent tokens render here on the server, so the banner paints in
            brand colours with no extra client code. */}
        <ConsentTheme theme={consentTheme} colorScheme="dark" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* No resolveConsent(): the browser resolves consent after
              hydration, so pages stay static. Scripts (the Meta Pixel) and
              options come from c15t.config.ts. */}
          <ConsentRoot>
            <BrandProvider>
              <LenisProvider>
                <Navbar />
                {children}
                <Footer />
                <ConsentBanner legalLinks={["privacyPolicy"]} />
                <ConsentDialog />
              </LenisProvider>
            </BrandProvider>
          </ConsentRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}

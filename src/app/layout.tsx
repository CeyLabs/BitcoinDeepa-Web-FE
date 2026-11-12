import type React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Sinhala, Nunito_Sans, Ubuntu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import LenisProvider from "@/src/components/lenis-provider";
import { BrandProvider } from "@/src/components/brand-provider";
import FacebookPixel from "@/src/components/facebook-pixel";

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
  metadataBase: new URL("https://www.bitcoindeepa.com"),
  title: "Bitcoin Deepa",
  description:
    "Bitcoin Deepa — Where innovation, Bitcoin, and community build together in Sri Lanka 🇱🇰",
  generator: "Next.js 15.3.0",
  applicationName: "Bitcoin Deepa",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Bitcoin",
    "Sri Lanka",
    "Bitcoin Community",
    "Bitcoin Education",
    "Bitcoin News",
    "Bitcoin Events",
    "Bitcoin Resources",
    "Bitcoin Wallets",
  ],
  // The image itself comes from src/app/opengraph-image.png (file convention).
  openGraph: {
    title: "Bitcoin Deepa",
    description:
      "Bitcoin Deepa — Where innovation, Bitcoin, and community build together in Sri Lanka 🇱🇰",
    url: "/",
    siteName: "Bitcoin Deepa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitcoin Deepa",
    description:
      "Bitcoin Deepa — Where innovation, Bitcoin, and community build together in Sri Lanka 🇱🇰",
  },
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

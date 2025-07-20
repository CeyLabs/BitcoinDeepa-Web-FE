import type React from "react";
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import LenisProvider from "@/src/components/lenis-provider";
import { BrandProvider } from "@/src/components/brand-provider";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "බිට්කොයින් පෙළහර - Book Launch & Purchase",
  description:
    "Official Sinhala translation of 'The Bullish Case for Bitcoin' is now launched! Buy the book online and get it delivered to your doorstep in Sri Lanka. Limited copies available.",
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
  openGraph: {
    title: "බිට්කොයින් පෙළහර - Book Launch & Purchase",
    description:
      "Official Sinhala translation of 'The Bullish Case for Bitcoin' is now launched! Buy the book online and get it delivered to your doorstep in Sri Lanka. Limited copies available.",
    url: "https://www.bitcoindeepa.com/#book-order",
    siteName: "Bitcoin Deepa",
    images: [
      {
        url: "https://www.bitcoindeepa.com/images/book-mockup-preview.png",
        width: 1200,
        height: 630,
        alt: "බිට්කොයින් පෙළහර - Book Launch & Purchase",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "බිට්කොයින් පෙළහර - Book Launch & Purchase",
    description:
      "Official Sinhala translation of 'The Bullish Case for Bitcoin' is now launched! Buy the book online and get it delivered to your doorstep in Sri Lanka. Limited copies available.",
    images: ["https://www.bitcoindeepa.com/images/book-mockup-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo2.className} antialiased`}>
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

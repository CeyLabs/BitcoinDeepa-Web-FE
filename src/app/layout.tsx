import type React from "react";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import LenisProvider from "@/src/components/lenis-provider";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "BitcoinDeepa",
  description:
    "Bitcoin Deepa — Where innovation, Bitcoin, and community build together in Sri Lanka 🇱🇰",
  generator: "Next.js 15.3.0",
  applicationName: "BitcoinDeepa",
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
          <LenisProvider>
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

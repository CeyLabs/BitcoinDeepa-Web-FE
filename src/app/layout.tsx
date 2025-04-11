import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BitcoinDeepa",
    description: "Bitcoin Deepa — Where innovation, Bitcoin, and community build together in Sri Lanka 🇱🇰",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}

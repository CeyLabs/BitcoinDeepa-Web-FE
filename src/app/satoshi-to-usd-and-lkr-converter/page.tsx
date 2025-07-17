import SatsConverter from "@/src/components/sats-converter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satoshi to USD and LKR Converter | BitcoinDeepa",
  description:
    "Convert satoshis to USD, BTC, and LKR with real-time exchange rates. Simple and accurate Bitcoin unit converter.",
  keywords: [
    "satoshi",
    "bitcoin",
    "converter",
    "USD",
    "LKR",
    "BTC",
    "cryptocurrency",
  ],
};

export default function ConverterPage() {
  return (
    <main className="min-h-screen bg-black">
      <SatsConverter />
    </main>
  );
}

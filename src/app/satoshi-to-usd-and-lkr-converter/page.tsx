import SatsConverter from "@/src/components/sats-converter";
import type { Metadata } from "next";
import { JsonLd } from "@/src/components/seo/json-ld";
import { pageMetadata } from "@/src/lib/seo";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/src/lib/site";

const PATH = "/satoshi-to-usd-and-lkr-converter";
const DESCRIPTION =
  "Convert satoshis (sats) to Sri Lankan Rupees (LKR), US Dollars (USD) and Bitcoin (BTC) with live exchange rates. A free, simple and accurate Bitcoin unit converter.";

export const metadata: Metadata = pageMetadata({
  title: "Satoshi to LKR & USD Converter",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "satoshi to LKR",
    "sats to LKR",
    "satoshi to USD",
    "BTC to LKR",
    "bitcoin price Sri Lanka",
    "satoshi converter",
    "bitcoin unit converter",
  ],
});

export default function ConverterPage() {
  return (
    <main className="min-h-screen bg-black">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Satoshi to LKR & USD Converter",
          url: absoluteUrl(PATH),
          description: DESCRIPTION,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          inLanguage: "en-LK",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "LKR" },
          publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
        }}
      />
      <SatsConverter />
    </main>
  );
}

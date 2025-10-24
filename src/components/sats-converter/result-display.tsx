"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { LKRCard, ResultCard } from "./result-cards";

interface ConversionResult {
  sats: number;
  usd: number;
  btc: number;
  lkr: number;
  isLoading?: boolean;
  hasError?: boolean;
}

interface ResultDisplayProps {
  result: ConversionResult | null;
  isInView: boolean;
  formatNumber: (num: number, decimals?: number) => string;
  formatBTC: (num: number) => string;
  formatLKR: (num: number) => string;
}

function ResultDisplayComponent({
  result,
  isInView,
  formatNumber,
  formatBTC,
  formatLKR,
}: ResultDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-4"
    >
      {/* USD */}
      <ResultCard
        value={
          result?.isLoading || result?.hasError ? (
            <span className="bg-gradient-to-r from-gray-500 via-white to-gray-500 bg-[length:200%_100%] animate-shimmer-text bg-clip-text text-transparent">
              0.00
            </span>
          ) : result && result.sats > 0 ? (
            formatNumber(result.usd)
          ) : (
            "0"
          )
        }
        icon="/images/icons/s_usd.webp"
        iconAlt="USD"
        currency="USD"
      />

      {/* BTC */}
      <ResultCard
        value={
          result?.isLoading || result?.hasError ? (
            <span className="bg-gradient-to-r from-gray-500 via-white to-gray-500 bg-[length:200%_100%] animate-shimmer-text bg-clip-text text-transparent">
              0.0000
            </span>
          ) : result && result.sats > 0 ? (
            formatBTC(result.btc)
          ) : (
            "0"
          )
        }
        icon="/images/icons/s_btc.webp"
        iconAlt="Bitcoin"
        currency="BTC"
      />

      {/* LKR */}
      <LKRCard
        value={
          result?.isLoading || result?.hasError ? (
            <span className="bg-gradient-to-r from-gray-500 via-white to-gray-500 bg-[length:200%_100%] animate-shimmer-text bg-clip-text text-transparent">
              0.00
            </span>
          ) : result && result.sats > 0 ? (
            formatLKR(result.lkr)
          ) : (
            "0"
          )
        }
      />
    </motion.div>
  );
}

export const ResultDisplay = memo(ResultDisplayComponent);

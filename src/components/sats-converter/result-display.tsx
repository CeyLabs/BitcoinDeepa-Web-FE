"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { LKRCard, ResultCard } from "./result-cards";

interface ConversionResult {
  usd: number;
  btc: number;
  lkr: number;
  lastUpdated: string;
}

interface ResultDisplayProps {
  result: ConversionResult | null;
  isUpdating: boolean;
  isInView: boolean;
  formatNumber: (num: number, decimals?: number) => string;
  formatBTC: (num: number) => string;
  formatLKR: (num: number) => string;
}

function ResultDisplayComponent({
  result,
  isUpdating,
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
        value={result ? `$${formatNumber(result.usd)}` : "$0.00"}
        icon="/images/icons/s_usd.webp"
        iconAlt="USD"
        currency="USD"
        isUpdating={isUpdating}
      />

      {/* BTC */}
      <ResultCard
        value={result ? formatBTC(result.btc) : "0.0000"}
        icon="/images/icons/s_btc.webp"
        iconAlt="Bitcoin"
        currency="BTC"
        isUpdating={isUpdating}
      />

      {/* LKR */}
      <LKRCard
        value={result ? `රු${formatLKR(result.lkr)}` : "රු0.00"}
        isUpdating={isUpdating}
      />

      {/* Last Updated */}
      <div className="text-center text-sm text-gray-500">
        {result ? (
          <>
            Last updated: {new Date(result.lastUpdated).toLocaleTimeString()}
            {isUpdating && (
              <span className="ml-2 text-bitcoin">• Updating...</span>
            )}
          </>
        ) : (
          <span>Loading rates...</span>
        )}
      </div>
    </motion.div>
  );
}

export const ResultDisplay = memo(ResultDisplayComponent);

"use client";

import type React from "react";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSatsConverterSync } from "../hooks/use-sats-converter-sync";

import { ConverterInput } from "./sats-converter/converter-input";
import { ResultDisplay } from "./sats-converter/result-display";
import { InfoSection } from "./sats-converter/info-section";

export default function SatsConverter() {
  const [inputValue, setInputValue] = useState("10000");
  const [formattedInputValue, setFormattedInputValue] = useState("10,000");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const { sats, setSats, result } = useSatsConverterSync(10000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters to get the raw number
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    
    // Store the raw value
    setInputValue(rawValue);
    
    // Format with thousand separators for display
    const numberValue = Number.parseInt(rawValue) || 0;
    setFormattedInputValue(numberValue.toLocaleString("en-US"));
    
    // Update sats for conversion
    setSats(numberValue);
  };

  // Simple formatting functions
  const formatNumber = (num: number, decimals = 2): string => {
    if (num === 0) return "0.00";
    if (num < 0.000001) return num.toExponential(2);
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatBTC = (num: number): string => {
    if (num === 0) return "0.0000";
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 8,
    });
  };

  const formatLKR = (num: number): string => {
    if (num === 0) return "0.00";
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="pt-28 sm:pt-28 pb-16 md:pt-32 md:pb-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bitcoin/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-8 md:px-8 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold mb-4">
            <span className="text-white">Instant </span>
            <span className="text-bitcoin">satoshi</span>
            <span className="text-white"> to USD/LKR Converter</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Calculate satoshis to USD & LKR with real-time rates
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Input Field */}
            <ConverterInput 
              value={inputValue} 
              formattedValue={formattedInputValue}
              onChange={handleInputChange} 
            />

            {/* Results Section - No loading states, instant updates */}
            <ResultDisplay
              result={result}
              isInView={isInView}
              formatNumber={formatNumber}
              formatBTC={formatBTC}
              formatLKR={formatLKR}
            />

            {/* Info Section */}
            <InfoSection isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

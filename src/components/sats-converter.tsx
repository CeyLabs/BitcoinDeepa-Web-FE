"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSatsConverterSync } from "../hooks/use-sats-converter-sync";

import { ConverterInput } from "./sats-converter/converter-input";
import { InfoSection } from "./sats-converter/info-section";

type FieldKey = "sats" | "usd" | "btc" | "lkr";

const sanitizeIntegerInput = (value: string) => value.replace(/[^0-9]/g, "");

const sanitizeDecimalInput = (value: string) => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  if (!cleaned) {
    return "";
  }

  const [integerPart, ...decimalParts] = cleaned.split(".");
  if (decimalParts.length === 0) {
    return integerPart;
  }

  const decimals = decimalParts.join("").replace(/\./g, "");
  if (decimals.length === 0) {
    return `${integerPart}.`;
  }

  return `${integerPart}.${decimals}`;
};

const formatSatsValue = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) {
    return "0";
  }

  return Math.round(value).toLocaleString("en-US");
};

const formatTwoDecimals = (value: number) => {
  if (!Number.isFinite(value) || value === 0) {
    return "0.00";
  }

  if (Math.abs(value) < 0.000001) {
    return value.toExponential(2);
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatBtcValue = (value: number) => {
  if (!Number.isFinite(value) || value === 0) {
    return "0.0000";
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 8,
  });
};

export default function SatsConverter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const initialSats = 10000;
  const { setSats, setFromUsd, setFromLkr, setFromBtc, result, isReady } =
    useSatsConverterSync(initialSats);

  const [activeField, setActiveField] = useState<FieldKey | null>(null);
  const [inputs, setInputs] = useState(() => ({
    sats: formatSatsValue(initialSats),
    usd: "0.00",
    btc: "0.0000",
    lkr: "0.00",
  }));

  useEffect(() => {
    if (!result) {
      return;
    }

    setInputs((prev) => ({
      sats: activeField === "sats" ? prev.sats : formatSatsValue(result.sats),
      usd: activeField === "usd" ? prev.usd : formatTwoDecimals(result.usd),
      btc: activeField === "btc" ? prev.btc : formatBtcValue(result.btc),
      lkr: activeField === "lkr" ? prev.lkr : formatTwoDecimals(result.lkr),
    }));
  }, [result, activeField]);

  const handleFieldFocus = (field: FieldKey) => () => {
    setActiveField(field);
    setInputs((prev) => ({
      ...prev,
      [field]:
        field === "sats"
          ? sanitizeIntegerInput(prev[field])
          : sanitizeDecimalInput(prev[field]),
    }));
  };

  const handleFieldBlur = (field: FieldKey) => () => {
    setActiveField(null);

    setInputs((prev) => ({
      ...prev,
      [field]: (() => {
        if (!result) {
          return prev[field];
        }

        switch (field) {
          case "sats":
            return formatSatsValue(result.sats);
          case "usd":
            return formatTwoDecimals(result.usd);
          case "btc":
            return formatBtcValue(result.btc);
          case "lkr":
            return formatTwoDecimals(result.lkr);
          default:
            return prev[field];
        }
      })(),
    }));
  };

  const handleSatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeIntegerInput(event.target.value);
    setInputs((prev) => ({
      ...prev,
      sats: sanitized,
    }));

    const numericValue = sanitized === "" ? 0 : Number.parseInt(sanitized, 10);
    setSats(numericValue);
  };

  const handleUsdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeDecimalInput(event.target.value);
    setInputs((prev) => ({
      ...prev,
      usd: sanitized,
    }));

    const numericValue =
      sanitized === "" || sanitized === "." ? 0 : Number.parseFloat(sanitized);
    if (Number.isFinite(numericValue)) {
      setFromUsd(numericValue);
    }
  };

  const handleBtcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeDecimalInput(event.target.value);
    setInputs((prev) => ({
      ...prev,
      btc: sanitized,
    }));

    const numericValue =
      sanitized === "" || sanitized === "." ? 0 : Number.parseFloat(sanitized);
    if (Number.isFinite(numericValue)) {
      setFromBtc(numericValue);
    }
  };

  const handleLkrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeDecimalInput(event.target.value);
    setInputs((prev) => ({
      ...prev,
      lkr: sanitized,
    }));

    const numericValue =
      sanitized === "" || sanitized === "." ? 0 : Number.parseFloat(sanitized);
    if (Number.isFinite(numericValue)) {
      setFromLkr(numericValue);
    }
  };

  const secondaryFieldsDisabled =
    !isReady || result.isLoading || result.hasError;

  return (
    <section
      ref={sectionRef}
      className="pt-28 sm:pt-28 pb-16 md:pt-32 md:pb-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bitcoin/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-8 md:px-8 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-2xl md:text-4xl font-bold mb-4">
            <span className="text-bitcoin">Sats to </span>
            <span className="text-white">LKR</span>
            <span className="text-white"> Converter</span>
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
            <ConverterInput
              value={inputs.sats}
              onChange={handleSatsChange}
              onFocus={handleFieldFocus("sats")}
              onBlur={handleFieldBlur("sats")}
              unit="SATS"
              iconSrc="/images/icons/s_sats.webp"
              iconAlt="Satoshi"
              inputMode="numeric"
            />

            <ConverterInput
              value={inputs.usd}
              onChange={handleUsdChange}
              onFocus={handleFieldFocus("usd")}
              onBlur={handleFieldBlur("usd")}
              unit="USD"
              iconSrc="/images/icons/s_usd.webp"
              iconAlt="USD"
              inputMode="decimal"
              placeholder={
                secondaryFieldsDisabled ? "Loading rates..." : "0.00"
              }
              disabled={secondaryFieldsDisabled}
            />

            <ConverterInput
              value={inputs.btc}
              onChange={handleBtcChange}
              onFocus={handleFieldFocus("btc")}
              onBlur={handleFieldBlur("btc")}
              unit="BTC"
              iconSrc="/images/icons/s_btc.webp"
              iconAlt="Bitcoin"
              inputMode="decimal"
              placeholder={
                secondaryFieldsDisabled ? "Loading rates..." : "0.0000"
              }
              disabled={secondaryFieldsDisabled}
            />

            <ConverterInput
              value={inputs.lkr}
              onChange={handleLkrChange}
              onFocus={handleFieldFocus("lkr")}
              onBlur={handleFieldBlur("lkr")}
              unit="LKR"
              iconSrc="/images/icons/s_lkr.webp"
              iconAlt="LKR"
              inputMode="decimal"
              placeholder={
                secondaryFieldsDisabled ? "Loading rates..." : "0.00"
              }
              disabled={secondaryFieldsDisabled}
            />

            {/* Info Section */}
            <InfoSection isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

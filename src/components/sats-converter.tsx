"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSatsConverterSync } from "../hooks/use-sats-converter-sync";
import { cn } from "../lib/utils";

import { ConverterInput } from "./sats-converter/converter-input";
import { InfoSection } from "./sats-converter/info-section";

type FieldKey = "sats" | "usd" | "btc" | "lkr";

const PRESETS = [
  { label: "1k", sats: 1_000 },
  { label: "10k", sats: 10_000 },
  { label: "100k", sats: 100_000 },
  { label: "1M", sats: 1_000_000 },
  { label: "1 BTC", sats: 100_000_000 },
];

const rateFmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: n >= 1000 ? 0 : 2 });

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

  // Headline rates, derived from the latest conversion and kept when the
  // amount is cleared (a zero amount can't tell us the rate).
  const [rates, setRates] = useState<{ lkrPerBtc: number; lkrPerUsd: number } | null>(null);
  useEffect(() => {
    if (!result || result.isLoading || result.btc <= 0 || result.usd <= 0) return;
    setRates({ lkrPerBtc: result.lkr / result.btc, lkrPerUsd: result.lkr / result.usd });
  }, [result]);

  const applyPreset = (sats: number) => {
    setActiveField(null);
    setInputs((prev) => ({ ...prev, sats: formatSatsValue(sats) }));
    setSats(sats);
  };

  const loadingPlaceholder = secondaryFieldsDisabled ? "Loading rates…" : undefined;

  return (
    <section className="relative isolate overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-radial-[ellipse_at_top] from-bitcoin/15 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 pt-36 pb-24 sm:px-6 md:pt-44 lg:px-8 lg:pb-32">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16">
          {/* Intro */}
          <div className="lg:sticky lg:top-32">
            <p className="mb-5 type-eyebrow text-bitcoin">Sats converter</p>
            <h1 className="type-display">
              <span className="block text-white">Sats to rupees,</span>
              <span className="block text-zinc-500">at live rates.</span>
            </h1>
            <p className="mt-6 max-w-xl type-lede text-zinc-300">
              Convert between satoshis, bitcoin, US dollars and Sri Lankan rupees. Type in any field
              and the others update instantly.
            </p>
            <div className="mt-8 flex flex-wrap gap-2" aria-live="polite">
              <span className="flex h-8 items-center rounded-md bg-zinc-900 px-3 text-sm text-zinc-300">
                1 BTC ≈ Rs. {rates ? rateFmt(rates.lkrPerBtc) : "…"}
              </span>
              <span className="flex h-8 items-center rounded-md bg-zinc-900 px-3 text-sm text-zinc-300">
                1 USD ≈ Rs. {rates ? rateFmt(rates.lkrPerUsd) : "…"}
              </span>
              <span className="flex h-8 items-center gap-2 rounded-md bg-zinc-900 px-3 text-sm text-zinc-400">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    result.hasError ? "bg-red-500" : rates ? "bg-emerald-500" : "animate-pulse bg-zinc-500",
                  )}
                />
                {result.hasError ? "Rates unavailable" : "Live from Ceylon Cash"}
              </span>
            </div>
          </div>

          {/* Converter */}
          <div className="rounded-xl bg-zinc-900 p-2">
            <div className="space-y-2">
              <ConverterInput
                id="conv-sats"
                value={inputs.sats}
                onChange={handleSatsChange}
                onFocus={handleFieldFocus("sats")}
                onBlur={handleFieldBlur("sats")}
                unit="SATS"
                name="Satoshis"
                iconSrc="/images/icons/s_sats.webp"
                inputMode="numeric"
              />
              <ConverterInput
                id="conv-btc"
                value={inputs.btc}
                onChange={handleBtcChange}
                onFocus={handleFieldFocus("btc")}
                onBlur={handleFieldBlur("btc")}
                unit="BTC"
                name="Bitcoin"
                iconSrc="/images/icons/s_btc.webp"
                inputMode="decimal"
                placeholder={loadingPlaceholder ?? "0.0000"}
                disabled={secondaryFieldsDisabled}
              />
              <ConverterInput
                id="conv-usd"
                value={inputs.usd}
                onChange={handleUsdChange}
                onFocus={handleFieldFocus("usd")}
                onBlur={handleFieldBlur("usd")}
                unit="USD"
                name="US dollars"
                iconSrc="/images/icons/s_usd.webp"
                inputMode="decimal"
                placeholder={loadingPlaceholder ?? "0.00"}
                disabled={secondaryFieldsDisabled}
              />
              <ConverterInput
                id="conv-lkr"
                value={inputs.lkr}
                onChange={handleLkrChange}
                onFocus={handleFieldFocus("lkr")}
                onBlur={handleFieldBlur("lkr")}
                unit="LKR"
                name="Sri Lankan rupees"
                iconSrc="/images/icons/s_lkr.webp"
                inputMode="decimal"
                placeholder={loadingPlaceholder ?? "0.00"}
                disabled={secondaryFieldsDisabled}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 px-3 pt-4 pb-3">
              <span className="mr-1 text-sm text-zinc-500">Quick amounts</span>
              {PRESETS.map((p) => {
                const active = result.sats === p.sats && activeField === null;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p.sats)}
                    aria-pressed={active}
                    className={cn(
                      "flex h-8 items-center rounded-md px-2.5 text-sm font-medium tabular-nums transition-colors",
                      active ? "bg-bitcoin text-black" : "bg-zinc-800 text-zinc-300 hover:text-white",
                    )}
                  >
                    {p.label}
                    {p.sats < 100_000_000 && <span className="ml-1 text-xs opacity-70">sats</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <InfoSection />
        </div>
      </div>
    </section>
  );
}

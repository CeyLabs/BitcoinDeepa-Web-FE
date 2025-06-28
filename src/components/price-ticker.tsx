"use client";

import { useState, useEffect } from "react";

export default function PriceTicker() {
  const [price, setPrice] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("ticker-dismissed");
    if (dismissed === "true") {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    async function fetchPrice() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=lkr"
        );
        const data = await res.json();
        if (data.bitcoin && data.bitcoin.lkr) {
          setPrice(data.bitcoin.lkr);
        }
      } catch (e) {
        console.error("Failed to fetch price", e);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const priceLabel = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
        maximumFractionDigits: 0,
      }).format(price)
    : "...";

  return (
    <div className="bg-bitcoin text-black text-sm py-2 px-4 flex justify-center items-center relative">
      <span className="font-medium">1 BTC = {priceLabel}</span>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-black hover:text-white"
        aria-label="Close price ticker"
        onClick={() => {
          setVisible(false);
          window.localStorage.setItem("ticker-dismissed", "true");
        }}
      >
        ×
      </button>
    </div>
  );
}

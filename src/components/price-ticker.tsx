"use client";

import { useState, useEffect } from "react";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=lkr";
const STORAGE_KEY = "priceTickerDismissed";

export default function PriceTicker() {
  const [price, setPrice] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const fetchPrice = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data?.bitcoin?.lkr) {
          setPrice(data.bitcoin.lkr);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrice();
    const id = setInterval(fetchPrice, 60000);
    return () => clearInterval(id);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (dismissed) return null;

  return (
    <div className="bg-bitcoin text-black text-sm flex items-center justify-center py-1 px-4">
      <span className="font-semibold">
        1 BTC ≈ {price ? price.toLocaleString() : "..."} LKR
      </span>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="ml-3 text-black/60 hover:text-black"
      >
        &times;
      </button>
    </div>
  );
}

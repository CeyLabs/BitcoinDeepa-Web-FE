"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PriceTickerProps {
  className?: string;
}

export default function PriceTicker({ className }: PriceTickerProps) {
  const [price, setPrice] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  const fetchPrice = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=lkr"
      );
      const data = await res.json();
      if (data?.bitcoin?.lkr) {
        setPrice(data.bitcoin.lkr);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "bg-bitcoin text-white text-sm font-exo2 px-3 py-1 rounded-full flex items-center",
        className
      )}
    >
      <span className="font-medium">1 BTC ≈ {price ? price.toLocaleString("en-US") : "--"} LKR</span>
      <button
        className="ml-2 text-white/70 hover:text-white"
        onClick={() => setVisible(false)}
        aria-label="Dismiss price ticker"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

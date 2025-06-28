"use client";

import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

interface PriceTickerProps {
  className?: string;
}

export default function PriceTicker({ className }: PriceTickerProps) {
  const [price, setPrice] = useState<number | null>(null);

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
    const interval = setInterval(fetchPrice, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "bg-bitcoin text-white text-sm font-exo2 px-3 py-1 rounded-full flex items-center",
        className
      )}
    >
      <span className="font-medium">1 BTC ≈ {price ? price.toLocaleString("en-US") : "--"} LKR</span>
    </div>
  );
}

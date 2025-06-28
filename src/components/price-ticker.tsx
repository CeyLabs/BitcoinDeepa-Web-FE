"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function PriceTicker() {
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
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-bitcoin text-black text-sm py-1 px-4 flex justify-center items-center relative">
      <span className="font-medium">
        1 BTC ≈ {price ? price.toLocaleString("en-US") : "--"} LKR
      </span>
      <button
        className="absolute right-2 text-black/70 hover:text-black"
        onClick={() => setVisible(false)}
        aria-label="Dismiss price ticker"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

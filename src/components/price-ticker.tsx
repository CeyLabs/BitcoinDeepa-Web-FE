"use client";

import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

interface PriceTickerProps {
  className?: string;
  refreshInterval?: number; // Optional refresh interval in milliseconds
}

interface BitcoinPrice {
  price: number;
  lastUpdated: number; // Timestamp when the price was last updated
}

const CACHE_KEY = "bitcoin_price_lkr";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function PriceTicker({
  className,
  refreshInterval,
}: PriceTickerProps) {
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if there's a cached price and it's still valid
      const cachedData = localStorage.getItem(CACHE_KEY);

      if (cachedData) {
        const parsedData: BitcoinPrice = JSON.parse(cachedData);
        const isExpired = Date.now() - parsedData.lastUpdated > CACHE_DURATION;

        if (!isExpired) {
          setPrice(parsedData.price);
          setIsLoading(false);
          return;
        }
      }

      // Cache is expired or doesn't exist, fetch fresh data via internal proxy
      const res = await fetch("/api/bitcoin-price/btc");

      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }

      const data = await res.json();

      if (data?.avg_rate_lkr) {
        const currentPrice = data.avg_rate_lkr;

        // Update state and cache the new price
        setPrice(currentPrice);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            price: currentPrice,
            lastUpdated: Date.now(),
          }),
        );
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (e) {
      console.error("Failed to fetch Bitcoin price:", e);
      setError("Failed to load price");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch price on component mount
    fetchPrice();

    // Set up refresh interval if provided
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchPrice, refreshInterval);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [refreshInterval]);

  return (
    <div
      className={cn(
        "bg-white/10 text-white text-sm font-exo2 px-4 py-2 rounded-full flex items-center justify-center",
        className,
      )}
    >
      {isLoading ? (
        <span className="font-medium whitespace-nowrap flex items-center">
          1 BTC ≈ රු.{" "}
          <span className="ml-1 relative">
            <span className="bg-gradient-to-r from-gray-500 via-white to-gray-500 bg-[length:200%_100%] animate-shimmer-text bg-clip-text text-transparent">
              00,000,000
            </span>
          </span>
        </span>
      ) : error ? (
        <span className="font-medium whitespace-nowrap">1 BTC ≈ රු. --</span>
      ) : (
        <span className="font-medium whitespace-nowrap">
          1 BTC ≈ රු. {price ? price.toLocaleString("en-US") : "--"}
        </span>
      )}
    </div>
  );
}

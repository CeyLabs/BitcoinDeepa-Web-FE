"use client";

import { memo } from "react";
import { Card } from "../../components/ui/card";
import Image from "next/image";

// Memoized result card component to prevent unnecessary re-renders
export const ResultCard = memo(
  ({
    value,
    icon,
    iconAlt,
    currency,
    isUpdating,
  }: {
    value: string;
    icon: string;
    iconAlt: string;
    currency: string;
    isUpdating: boolean;
  }) => (
    <Card className="p-6 bg-zinc-900/50 backdrop-blur-sm border-bitcoin/10 transition-colors">
      <div className="flex items-center justify-between">
        <div
          className={`text-2xl md:text-3xl font-bold text-white transition-opacity duration-200 ${
            isUpdating ? "opacity-60" : "opacity-100"
          }`}
        >
          {value}
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Image
            src={icon || "/placeholder.svg"}
            alt={iconAlt}
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-medium">{currency}</span>
        </div>
      </div>
    </Card>
  )
);

ResultCard.displayName = "ResultCard";

// Memoized LKR card component
export const LKRCard = memo(
  ({ value, isUpdating }: { value: string; isUpdating: boolean }) => (
    <Card className="p-6 bg-zinc-900/50 backdrop-blur-sm border-bitcoin/10 transition-colors">
      <div className="flex items-center justify-between">
        <div
          className={`text-2xl md:text-3xl font-bold text-white transition-opacity duration-200 ${
            isUpdating ? "opacity-60" : "opacity-100"
          }`}
        >
          {value}
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Image
            src="/images/icons/s_lkr.webp"
            alt="LKR"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-medium">LKR</span>
        </div>
      </div>
    </Card>
  )
);

LKRCard.displayName = "LKRCard";

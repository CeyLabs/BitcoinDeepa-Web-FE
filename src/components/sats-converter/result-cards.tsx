"use client";

import { memo } from "react";
import { Card } from "../../components/ui/card";
import Image from "next/image";

// Result card component with loading state support
export const ResultCard = memo(
  ({
    value,
    icon,
    iconAlt,
    currency,
  }: {
    value: string | React.ReactNode;
    icon: string;
    iconAlt: string;
    currency: string;
  }) => (
    <Card className="p-6 bg-zinc-900/50 backdrop-blur-sm border-bitcoin/10 transition-colors">
      <div className="flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
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

// LKR card component with loading state support
export const LKRCard = memo(
  ({ value }: { value: string | React.ReactNode }) => (
    <Card className="p-6 bg-zinc-900/50 backdrop-blur-sm border-bitcoin/10 transition-colors">
      <div className="flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
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

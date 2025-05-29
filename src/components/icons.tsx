"use client";

import type React from "react";
import { BitcoinIcon } from "lucide-react";

export const Bitcoin = (props: React.ComponentProps<typeof BitcoinIcon>) => (
  <BitcoinIcon {...props} />
);

export const LightningPattern = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <path
      d="M30,10 L20,45 L35,45 L15,90"
      stroke="#f90"
      strokeWidth="0.5"
      fill="none"
      className="absolute transform scale-150"
    />
    <path
      d="M70,10 L60,45 L75,45 L55,90"
      stroke="#f90"
      strokeWidth="0.5"
      fill="none"
      className="absolute transform scale-150 translate-x-20"
    />
    <path
      d="M50,5 L40,40 L55,40 L35,95"
      stroke="#f90"
      strokeWidth="0.5"
      fill="none"
      className="absolute transform scale-150 translate-x-10"
    />
  </svg>
);

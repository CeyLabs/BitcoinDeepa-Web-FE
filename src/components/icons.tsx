"use client";

import type React from "react";
import { BitcoinIcon as LucideBitcoinIcon } from "lucide-react";

export const Bitcoin = (
  props: React.ComponentProps<typeof LucideBitcoinIcon>
) => <LucideBitcoinIcon {...props} />;

export const BitcoinIcon1 = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    className={className}
    fill="currentColor"
  >
    <path d="M11.5 11.5V8.5C11.5 7.4 10.6 6.5 9.5 6.5H7.5V11.5H11.5ZM11.5 11.5V14.5C11.5 15.6 10.6 16.5 9.5 16.5H7.5V11.5H11.5ZM11.5 11.5H13.5C14.6 11.5 15.5 10.6 15.5 9.5C15.5 8.4 14.6 7.5 13.5 7.5H11.5V11.5Z" />
    <path d="M12 0.5C5.7 0.5 0.5 5.7 0.5 12C0.5 18.3 5.7 23.5 12 23.5C18.3 23.5 23.5 18.3 23.5 12C23.5 5.7 18.3 0.5 12 0.5ZM12 21.5C6.8 21.5 2.5 17.2 2.5 12C2.5 6.8 6.8 2.5 12 2.5C17.2 2.5 21.5 6.8 21.5 12C21.5 17.2 17.2 21.5 12 21.5Z" />
  </svg>
);

export const BitcoinIcon2 = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    className={className}
    fill="currentColor"
  >
    <path d="M13.1 11.2v-3.1c0-1.6-1.3-2.9-2.9-2.9H6.8v8.9h3.4c1.6 0 2.9-1.3 2.9-2.9zm-2.9-4.3c0.7 0 1.2 0.5 1.2 1.2v3.1c0 0.7-0.5 1.2-1.2 1.2H8.5V6.9h1.7z" />
    <path d="M13.1 13.9v3.1c0 1.6-1.3 2.9-2.9 2.9H6.8v-8.9h3.4c1.6 0 2.9 1.3 2.9 2.9zm-2.9 4.3c0.7 0 1.2-0.5 1.2-1.2v-3.1c0-0.7-0.5-1.2-1.2-1.2H8.5v5.5h1.7z" />
    <path d="M17.2 9.7c0 1.1-0.9 2-2 2h-2.1V5.7h2.1c1.1 0 2 0.9 2 2v2zm-1.7 0v-2c0-0.2-0.1-0.3-0.3-0.3h-0.4v2.6h0.4c0.2 0 0.3-0.1 0.3-0.3z" />
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
  </svg>
);

export const LightningIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </svg>
);

export const AlertCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="text-red-500"
    {...props}
  >
    <path
      d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EmptyFileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-bitcoin"
    {...props}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

export const EmptyImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="text-zinc-700"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
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

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
export const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.18 1.896-.96 6.504-1.356 8.628-.168.9-.504 1.2-.816 1.236-.696.06-1.224-.456-1.896-.9-1.056-.696-1.656-1.128-2.676-1.8-1.188-.78-.42-1.212.264-1.908.18-.18 3.252-2.976 3.312-3.228a.24.24 0 00-.06-.216c-.072-.06-.168-.036-.252-.024-.108.024-1.788 1.14-5.064 3.348-.48.324-.912.492-1.296.48-.432-.012-1.248-.24-1.86-.444-.756-.24-1.344-.372-1.296-.792.024-.216.324-.432.888-.66 3.504-1.524 5.832-2.532 6.996-3.012 3.336-1.392 4.02-1.632 4.476-1.632.096 0 .324.024 .468.144.12.096.156.228.168.324-.012.072.012.288 0.012.336z" />
  </svg>
);

export const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export const EduIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
    <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
    <path d="M12 10v12" />
    <path d="M12 22c4.2 0 7-1.67 7-5" />
    <path d="M10 10.5V14" />
    <path d="M14 10.5V14" />
    <path d="M10 14a2 2 0 1 0 4 0" />
    <path d="M6 10.5V14" />
  </svg>
);

export const CommunityIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M3 21C3 17.134 7.02944 14 12 14C16.9706 14 21 17.134 21 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const DeveloperIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 6.25278V19.2528M12 6.25278L6.5 10.0028M12 6.25278L17.5 10.0028M3 17.2528V8.75278C3 8.34038 3.18273 7.95278 3.48986 7.75278L11.4899 3.25278C11.8094 3.03054 12.1906 3.03054 12.5101 3.25278L20.5101 7.75278C20.8173 7.95278 21 8.34038 21 8.75278V17.2528C21 17.6652 20.8173 18.0528 20.5101 18.2528L12.5101 22.7528C12.1906 22.975 11.8094 22.975 11.4899 22.7528L3.48986 18.2528C3.18273 18.0528 3 17.6652 3 17.2528Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ResearchIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Release page icons
export const Download = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const Github = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const User = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const AlertCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const RefreshCw = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

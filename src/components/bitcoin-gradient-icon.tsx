"use client"
import type { LucideIcon } from "lucide-react"

interface GradientIconProps {
  icon: LucideIcon
  size?: number
  className?: string
}

export function BitcoinGradientIcon({ icon: Icon, size = 24, className = "" }: GradientIconProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-bitcoin-gradient blur-sm opacity-50 rounded-full"></div>
      <div className="relative z-10">
        <Icon size={size} className={`text-bitcoin ${className}`} />
      </div>
    </div>
  )
}

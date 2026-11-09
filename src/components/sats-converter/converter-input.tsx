"use client";

import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import Image from "next/image";
import type React from "react";

interface ConverterInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
  iconSrc: string;
  iconAlt: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function ConverterInput({
  value,
  onChange,
  unit,
  iconSrc,
  iconAlt,
  placeholder = "0",
  inputMode,
  onFocus,
  onBlur,
  disabled = false,
}: ConverterInputProps) {
  return (
    <Card className="p-6 bg-zinc-900/50 backdrop-blur-sm border-bitcoin/10 transition-colors group focus-within:border-bitcoin/50">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            inputMode={inputMode}
            disabled={disabled}
            autoComplete="off"
            className="text-2xl md:text-3xl font-bold bg-transparent border-none text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none p-0 h-auto shadow-none disabled:text-gray-500"
          />
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="font-medium">{unit}</span>
        </div>
      </div>
    </Card>
  );
}

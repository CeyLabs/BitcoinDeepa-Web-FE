"use client";

import { useState } from "react";
import type React from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ConverterInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
  name: string;
  iconSrc: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

/** One currency row of the converter: label line on top, a large amount input below. */
export function ConverterInput({
  id,
  value,
  onChange,
  unit,
  name,
  iconSrc,
  placeholder = "0",
  inputMode,
  onFocus,
  onBlur,
  disabled = false,
}: ConverterInputProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/,/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context).
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg bg-black px-5 py-4 ring-1 ring-zinc-800 transition-shadow focus-within:ring-2 focus-within:ring-bitcoin",
        disabled && "opacity-60",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="flex items-center gap-2.5 text-sm text-zinc-400">
          <Image src={iconSrc} alt="" width={20} height={20} className="size-5" />
          <span className="font-semibold text-white">{unit}</span>
          <span>{name}</span>
        </label>
        <button
          type="button"
          onClick={copy}
          disabled={disabled || !value}
          aria-label={copied ? `${unit} amount copied` : `Copy ${unit} amount`}
          title={copied ? "Copied" : "Copy"}
          className="flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-bitcoin disabled:pointer-events-none"
        >
          {copied ? <Check className="size-4 text-bitcoin" /> : <Copy className="size-4" />}
        </button>
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        disabled={disabled}
        autoComplete="off"
        spellCheck={false}
        className="mt-2 w-full bg-transparent text-3xl font-medium tracking-[-0.02em] tabular-nums text-white outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed md:text-4xl"
      />
    </div>
  );
}

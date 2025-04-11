"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useOutsideClick } from "@/src/hooks/use-outside-click"

interface CardModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  layoutId?: string
}

export function CardModal({ isOpen, onClose, children, layoutId }: CardModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  useOutsideClick(containerRef, onClose)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 h-screen z-50 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            ref={containerRef}
            layoutId={layoutId}
            className="max-w-3xl mx-auto bg-zinc-900 h-fit z-[60] my-10 p-6 md:p-10 rounded-3xl relative"
          >
            <button
              className="absolute top-4 right-4 h-8 w-8 bg-bitcoin rounded-full flex items-center justify-center"
              onClick={onClose}
            >
              <X className="h-5 w-5 text-black" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

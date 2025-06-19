"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  layoutId?: string;
}

export function CardModal({
  isOpen,
  onClose,
  children,
  layoutId,
}: CardModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-3xl border-none shadow-none bg-transparent p-0 my-4">
        <motion.div
          layoutId={layoutId}
          className="bg-zinc-900 p-6 md:p-10 rounded-3xl max-h-[85vh] overflow-y-auto shadow-xl"
        >
          {children}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

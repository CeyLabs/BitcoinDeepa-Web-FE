"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Bitcoin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const FloatingElement = ({
  icon,
  size,
  initialPosition,
  delay,
}: {
  icon: React.ReactNode;
  size: number;
  initialPosition: { x: number; y: number };
  delay: number;
}) => {
  const xMovement = Math.random() * 30 + 10;
  const yMovement = Math.random() * 30 + 10;
  const duration = Math.random() * 10 + 15;

  return (
    <motion.div
      className="absolute text-bitcoin/30 pointer-events-none"
      style={{
        left: `${initialPosition.x}%`,
        top: `${initialPosition.y}%`,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.7, 0.5, 0.7, 0],
        x: [0, xMovement, -xMovement, xMovement / 2, 0],
        y: [0, -yMovement, yMovement / 2, -yMovement, 0],
        rotate: [0, 20, -20, 10, 0],
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {icon}
    </motion.div>
  );
};

const BitcoinIcon1 = ({ className }: { className?: string }) => (
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

const BitcoinIcon2 = ({ className }: { className?: string }) => (
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

const LightningIcon = ({ className }: { className?: string }) => (
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

export default function JoinCommunity() {
  const [floatingElements, setFloatingElements] = useState<React.ReactNode[]>(
    []
  );

  useEffect(() => {
    const generateElements = () => {
      const elements = [];
      const count = window.innerWidth < 768 ? 8 : 15;

      const icons = [
        (size: number) => <BitcoinIcon1 className="text-bitcoin/30" />,
        (size: number) => <BitcoinIcon2 className="text-bitcoin/20" />,
        (size: number) => <LightningIcon className="text-purple-500/30" />,
        (size: number) => <Bitcoin size={size} className="text-bitcoin/25" />,
      ];

      for (let i = 0; i < count; i++) {
        const size = Math.floor(Math.random() * 40) + 20;
        const xPos = Math.random() * 90 + 5;
        const yPos = Math.random() * 80 + 10;
        const delay = Math.random() * 5;
        const iconIndex = Math.floor(Math.random() * icons.length);

        elements.push(
          <FloatingElement
            key={i}
            icon={icons[iconIndex](size)}
            size={size}
            initialPosition={{ x: xPos, y: yPos }}
            delay={delay}
          />
        );
      }

      setFloatingElements(elements);
    };

    generateElements();

    window.addEventListener("resize", generateElements);
    return () => window.removeEventListener("resize", generateElements);
  }, []);

  return (
    <section id="join" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bitcoin/10 via-transparent to-transparent pointer-events-none"></div>

      {floatingElements}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Join Sri Lanka's</span>
            <span className="block text-bitcoin mt-2">
              Fastest Growing Bitcoin Community 🇱🇰
            </span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect with fellow Bitcoin enthusiasts, attend exclusive events,
            and stay updated with the latest news and educational resources from
            the Sri Lankan Bitcoin community.
          </p>

          <div className="relative">
            <div className="absolute inset-0 bg-bitcoin/20 blur-2xl rounded-full transform scale-75 opacity-70"></div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative"
            >
              <Link
                href="https://lu.ma/BitcoinDeepa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-bitcoin hover:bg-bitcoin-dark text-black hover:text-white font-bold py-3 px-6 rounded-full text-base md:text-lg transition-colors duration-200 shadow-lg"
              >
                Join Our Community
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-bitcoin"></div>
              <p className="text-gray-300 font-medium text-base sm:text-lg">
                Monthly Meetups
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-bitcoin"></div>
              <p className="text-gray-300 font-medium text-base sm:text-lg">
                Educational Resources
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-bitcoin"></div>
              <p className="text-gray-300 font-medium text-base sm:text-lg">
                Global Network
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

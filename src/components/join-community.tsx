"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Bitcoin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BitcoinIcon1, BitcoinIcon2, LightningIcon } from "./icons";

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

export default function JoinCommunity() {
  const [floatingElements, setFloatingElements] = useState<React.ReactNode[]>(
    []
  );

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

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

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(generateElements, 300);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
    };
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
            Learn, connect, and grow with Sri Lanka’s Bitcoin community from
            grassroots meetups to BitcoinDeepa initiatives by Pearl of Satoshi.
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
                Community Meetups 🗓️
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-bitcoin"></div>
              <p className="text-gray-300 font-medium text-base sm:text-lg">
                BitcoinDeepa Initiatives ⚡
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-bitcoin"></div>
              <p className="text-gray-300 font-medium text-base sm:text-lg">
                Global Reach 🌍
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

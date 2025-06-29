"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { TwitterIcon, TelegramIcon, InstagramIcon } from "./icons";

const CURRENT_YEAR = new Date().getFullYear();

const CONFETTI_CONFIG = {
  particleCount: 30,
  spread: 60,
  colors: ["#f90", "#ffb84d", "#e68a00"],
  disableForReducedMotion: true,
};

const ICON_COMPONENTS = {
  telegram: <TelegramIcon className="text-white" />,
  twitter: <TwitterIcon className="text-white" />,
  instagram: <InstagramIcon className="text-white" />,
};

const Footer = () => {
  const [heartClicked, setHeartClicked] = useState(false);
  const heartRef = useRef<HTMLButtonElement>(null);

  const handleHeartClick = () => {
    setHeartClicked(true);

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    if (heartRef.current) {
      const rect = heartRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        ...CONFETTI_CONFIG,
        origin: { x, y },
      });
    }

    setTimeout(() => {
      setHeartClicked(false);
    }, 1000);
  };

  return (
    <footer className="relative overflow-hidden">
      <div className="relative backdrop-blur-2xl border border-white/[0.08] shadow-2xl ring-1 ring-white/[0.05] py-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden ">
          <div className="absolute bottom-0 left-1/2 transform bg-bitcoin-dark/60 -translate-x-1/2 translate-y-1/2 w-[226px] h-[226px] rounded-full blur-[125px]" />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute right-0 bottom-0 w-[260px] h-[260px] opacity-[0.1]">
            <Image
              src="/images/bitcoindeepa-logo.svg"
              alt="BitcoinDeepa Logo"
              width={260}
              height={260}
              className="object-contain"
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-12">
          <div className="flex gap-3 mb-8 justify-center">
            <SocialButton
              href="https://t.me/bitcoindeepa"
              icon="telegram"
              small
            />
            <SocialButton
              href="https://x.com/pearlofsatoshi"
              icon="twitter"
              small
            />
            <SocialButton
              href="https://instagram.com/bitcoindeepa"
              icon="instagram"
              small
            />
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4 justify-center">
            <NavLink
              href="https://blog.bitcoindeepa.com/about/"
              label="About"
              small
            />
            <NavLink href="#events" label="Events" small />
            <NavLink
              href="https://blog.bitcoindeepa.com/resources/"
              label="Resources"
              small
            />
            <NavLink href="#faq" label="FAQ" small />
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-2 w-full max-w-md">
            <SecondaryButton
              href="/privacy-policy"
              label="Privacy Policy"
              small
            />
            <SecondaryButton
              href="/license"
              label="License"
              small
            />
            <SecondaryButton
              href="https://t.me/bitcoindeepabot"
              label="Bitcoindeepa Bot"
              small
            />
              <SecondaryButton
                href="https://blog.bitcoindeepa.com/community"
                label="Community"
                small
              />
              <SecondaryButton
                href="https://blog.bitcoindeepa.com"
                label="Blog"
                small
              />
              <SecondaryButton
                href="https://lu.ma/bitcoindeepa"
                label="Luma"
                small
              />
              <div className="relative">
                <motion.button
                  ref={heartRef}
                  className={`flex items-center justify-center w-full h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 ${
                    heartClicked ? "scale-110" : ""
                  }`}
                  onClick={handleHeartClick}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {heartClicked ? (
                      <motion.span
                        key="bitcoin-heart"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        className="text-lg"
                      >
                        <span className="text-bitcoin">♥ 🇱🇰</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="regular-heart"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-lg text-red-500"
                      >
                        ♥
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <div />
            </div>
          </div>

          <div className="text-center text-zinc-500 text-sm mt-10">
            &copy; {CURRENT_YEAR} Bitcoindeepa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialButton = ({
  href,
  icon,
  small,
}: {
  href: string;
  icon: string;
  small?: boolean;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-xl bg-zinc-800 flex items-center justify-center w-9 h-9`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-4 h-4">
        {ICON_COMPONENTS[icon as keyof typeof ICON_COMPONENTS]}
      </div>
    </motion.a>
  );
};

const NavLink = ({
  href,
  label,
  small,
}: {
  href: string;
  label: string;
  small?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`text-zinc-300 hover:text-white transition-colors ${
        small ? "text-lg" : "text-[22px]"
      }`}
    >
      {label}
    </Link>
  );
};

const SecondaryButton = ({
  href,
  label,
  small,
}: {
  href: string;
  label: string;
  small?: boolean;
}) => {
  return (
    <motion.a
      href={href}
      className="flex items-center justify-center w-full h-8 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all duration-300 text-xs leading-tight sm:text-sm px-1.5 sm:px-3"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.a>
  );
};

export default Footer;

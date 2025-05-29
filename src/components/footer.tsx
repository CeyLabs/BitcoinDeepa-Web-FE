"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const Footer = () => {
  const [heartClicked, setHeartClicked] = useState(false);
  const heartRef = useRef<HTMLButtonElement>(null);
  const currentYear = new Date().getFullYear();

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
        particleCount: 30,
        spread: 60,
        origin: { x, y },
        colors: ["#f90", "#ffb84d", "#e68a00"],
        disableForReducedMotion: true,
      });
    }

    setTimeout(() => {
      setHeartClicked(false);
    }, 1000);
  };

  return (
    <footer className="relative py-12 bg-black/10 rounded-3xl mx-4 my-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-0 w-[260px] h-[260px] opacity-20">
          <Image
            src="/images/bitcoindeepa-logo.svg"
            alt="BitcoinDeepa Logo"
            width={260}
            height={260}
            className="object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
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
          <NavLink href="#about" label="About" small />
          <NavLink href="#events" label="Events" small />
          <NavLink href="#resources" label="Resources" small />
          <NavLink href="#faq" label="FAQ" small />
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
            <SecondaryButton href="/privacy" label="Privacy" small />
            <SecondaryButton
              href="https://t.me/bitcoindeepabot"
              label="TG Bot"
              small
            />
            <SecondaryButton href="/community" label="Community" small />
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
            <div className="col-span-1">
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
          &copy; {currentYear} Bitcoindeepa. All rights reserved.
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
  const icons = {
    telegram: (
      <svg
        viewBox="0 0 24 24"
        width={small ? 15 : 15}
        height={small ? 15 : 15}
        fill="white"
      >
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.18 1.896-.96 6.504-1.356 8.628-.168.9-.504 1.2-.816 1.236-.696.06-1.224-.456-1.896-.9-1.056-.696-1.656-1.128-2.676-1.8-1.188-.78-.42-1.212.264-1.908.18-.18 3.252-2.976 3.312-3.228a.24.24 0 00-.06-.216c-.072-.06-.168-.036-.252-.024-.108.024-1.788 1.14-5.064 3.348-.48.324-.912.492-1.296.48-.432-.012-1.248-.24-1.86-.444-.756-.24-1.344-.372-1.296-.792.024-.216.324-.432.888-.66 3.504-1.524 5.832-2.532 6.996-3.012 3.336-1.392 4.02-1.632 4.476-1.632.096 0 .324.024 .468.144.12.096.156.228.168.324-.012.072.012.288 0 .336z" />
      </svg>
    ),
    twitter: (
      <svg
        viewBox="0 0 24 24"
        width={small ? 15 : 15}
        height={small ? 15 : 15}
        fill="white"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg
        viewBox="0 0 24 24"
        width={small ? 15 : 15}
        height={small ? 15 : 15}
        fill="white"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-xl bg-zinc-800 flex items-center justify-center w-9 h-9`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-4 h-4">{icons[icon as keyof typeof icons]}</div>
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
      className="flex items-center justify-center w-full h-8 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all duration-300 text-sm px-3"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.a>
  );
};

export default Footer;

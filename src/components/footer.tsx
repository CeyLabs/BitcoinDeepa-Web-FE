"use client";

import { useState, useRef, type ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCoinBurst } from "./footer/coin-burst";
import { FooterWordmark } from "./footer/footer-wordmark";
import { SOCIAL_LINKS } from "@/src/lib/site";
import { Github, InstagramIcon, LumaIcon, TelegramIcon, TwitterIcon } from "./icons";
import { BrandName } from "./brand-provider";
import { TELEGRAM_INVITE } from "./nav/nav-data";
import { SriLankaFlag } from "./sri-lanka-flag";

const CURRENT_YEAR = new Date().getFullYear();

// Every official channel, same set as the community page's channel list.
const SOCIALS: Array<{ label: string; href: string; Icon: ComponentType<{ className?: string }> }> = [
  { label: "Telegram community", href: TELEGRAM_INVITE, Icon: TelegramIcon },
  { label: "X (@pearlofsatoshi)", href: SOCIAL_LINKS.x, Icon: TwitterIcon },
  { label: "Instagram (@bitcoindeepa)", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: "Events on Luma", href: "https://lu.ma/bitcoindeepa", Icon: LumaIcon },
  { label: "GitHub (CeyLabs)", href: SOCIAL_LINKS.github, Icon: Github },
];

const Footer = () => {
  const [heartClicked, setHeartClicked] = useState(false);
  const heartRef = useRef<HTMLButtonElement>(null);
  const burst = useCoinBurst();
  const resetTimer = useRef<number | undefined>(undefined);

  const handleHeartClick = () => {
    setHeartClicked(true);

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    // Throw a handful of BTC and sats coins from the heart.
    if (heartRef.current) {
      const rect = heartRef.current.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    // One timer, restarted on every click: the flag stays up until a second
    // after the last click instead of flickering off mid-streak.
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setHeartClicked(false), 1000);
  };

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* No backdrop-blur here: in Safari it samples past the viewport edge and
          shows a white haze while the footer scrolls in. */}
      <div className="relative border-t border-zinc-800 pt-10">
        <div className="container mx-auto px-6 relative z-10 py-12">
          <ul className="mb-8 flex flex-wrap justify-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  title={label}
                  className="flex size-9 items-center justify-center rounded-xl bg-zinc-800 text-white transition-colors hover:bg-zinc-700 hover:text-bitcoin"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="size-4" />
                </motion.a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4 justify-center">
            <NavLink
              href="/about"
              label="About"
              small
            />
            <NavLink href="/#events" label="Events" small />
            <NavLink href="/news" label="News" small />
            <NavLink href="/releases" label="Release Notes" small />
            <NavLink href="/#faq" label="FAQ" small />
            <NavLink href="/license" label="License" small />
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-2 w-full max-w-md">
              <SecondaryButton
                href="/privacy-policy"
                label="Privacy Policy"
                small
              />
              <SecondaryButton href="/terms" label="Terms" small />
              <SecondaryButton
                href="/return-policy"
                label="Return Policy"
                small
              />
              <SecondaryButton href="/brand" label="Brand" small />
              <SecondaryButton
                href="https://t.me/bitcoindeepabot"
                label="BitcoinDeepaBot"
                small
              />
              <SecondaryButton
                href="/community"
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
                  type="button"
                  aria-label="Send some love"
                  className="grid w-full h-8 place-items-center rounded-xl bg-zinc-800 transition-colors hover:bg-zinc-700"
                  onClick={handleHeartClick}
                  whileTap={{ scale: 0.96 }}
                >
                  {/* Both states stay mounted in one cell and cross-fade, so
                      rapid clicks can never leave the button empty. */}
                  <span
                    aria-hidden
                    className={`col-start-1 row-start-1 text-lg text-red-500 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      heartClicked ? "scale-25 opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"
                    }`}
                  >
                    ♥
                  </span>
                  <span
                    aria-hidden
                    className={`col-start-1 row-start-1 flex items-center gap-1.5 text-lg text-bitcoin transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      heartClicked ? "scale-100 opacity-100 blur-0" : "scale-25 opacity-0 blur-[4px]"
                    }`}
                  >
                    ♥ <SriLankaFlag className="h-3.5" />
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="text-center text-zinc-500 text-sm mt-10">
            &copy; {CURRENT_YEAR} <BrandName />. All rights reserved.
          </div>
        </div>

        {/* Signature wordmark: stacked hairline outlines that light up under
            the pointer, cropped by the bottom edge of the page. */}
        <div className="mx-auto -mb-[9%] max-w-7xl px-4 sm:px-6 lg:px-8">
          <FooterWordmark />
        </div>
      </div>
    </footer>
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
  const className = `text-zinc-300 hover:text-white transition-colors ${
    small ? "text-sm" : "text-[14px]"
  }`;
  const isHashLink = href.startsWith("#") || href.startsWith("/#");

  // Render hash links with plain anchors so SSR and client markup stay identical.
  if (isHashLink) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
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
      className="flex items-center justify-center w-full h-8 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all duration-300 text-xs leading-tight sm:text-sm px-1.5 sm:px-3"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.a>
  );
};

export default Footer;

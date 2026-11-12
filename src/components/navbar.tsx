"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Rocket } from "lucide-react";
import { fbEvent } from "@/src/lib/facebook-pixel";
import { cn } from "@/src/lib/utils";
import { SOCIAL_LINKS } from "@/src/lib/site";
import PriceTicker from "./price-ticker";
import { InstagramIcon, TelegramIcon, TwitterIcon } from "./icons";
import { useBrand } from "./brand-provider";
import { NAV_LINKS, NAV_MENUS, TELEGRAM_INVITE } from "./nav/nav-data";
import { MenuItem, MorphMenu } from "./nav/morph-menu";

const SOCIALS = [
  { label: "Telegram", href: TELEGRAM_INVITE, Icon: TelegramIcon },
  { label: "X", href: SOCIAL_LINKS.x, Icon: TwitterIcon },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { brand } = useBrand();

  const closeMobile = () => {
    setIsMenuOpen(false);
    setOpenSection(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-4 relative">
        <div
          ref={barRef}
          className="relative bg-[#1D1E1D]/85 backdrop-blur-xl rounded-3xl border border-zinc-800/50 shadow-lg overflow-visible"
        >
          <div className="flex items-center justify-between h-16 px-6">
            <Link href="/" className="flex items-center" onClick={closeMobile}>
              <Image
                src="/images/brand/DeepaLogo_WnO.svg"
                alt={brand}
                width={99}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </Link>

            {/* Desktop navigation, centred in the bar. */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <MorphMenu boundsRef={barRef} />
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="hidden xl:block">
                <PriceTicker className="min-w-[165px]" />
              </div>
              <Link
                href={TELEGRAM_INVITE}
                onClick={() => fbEvent("Lead")}
                className="px-5 py-2 text-sm font-semibold text-black bg-bitcoin hover:bg-bitcoin-dark transition-colors rounded-xl flex items-center whitespace-nowrap"
              >
                Join the Community
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative w-6 h-6 flex justify-center items-center"
              onClick={() => (isMenuOpen ? closeMobile() : setIsMenuOpen(true))}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex flex-col justify-between w-6 h-5">
                <div
                  className={cn(
                    "bg-bitcoin h-[2px] w-6 transition-all duration-300 ease-in-out origin-center",
                    isMenuOpen && "translate-y-[9px] rotate-45",
                  )}
                />
                <div
                  className={cn(
                    "bg-bitcoin h-[2px] w-6 rounded transition-all duration-200 ease-in-out",
                    isMenuOpen && "opacity-0 -translate-x-2",
                  )}
                />
                <div
                  className={cn(
                    "bg-bitcoin h-[2px] w-6 transition-all duration-300 ease-in-out origin-center",
                    isMenuOpen && "translate-y-[-9px] -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id="mobile-menu"
                aria-label="Main"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="md:hidden overflow-hidden"
              >
                <div className="space-y-2 border-t border-zinc-800 p-3">
                  {NAV_MENUS.map((menu) => {
                    const open = openSection === menu.id;
                    return (
                      <div key={menu.id} className="rounded-xl bg-zinc-900">
                        <button
                          type="button"
                          aria-expanded={open}
                          onClick={() => setOpenSection(open ? null : menu.id)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-white"
                        >
                          {menu.label}
                          <ChevronDown
                            className={cn(
                              "size-5 text-zinc-500 transition-transform duration-200",
                              open && "rotate-180 text-bitcoin",
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden px-1 pb-1"
                            >
                              {menu.items.map((item) => (
                                <li key={item.href}>
                                  <MenuItem item={item} onNavigate={closeMobile} />
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="flex w-full items-center rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3">
                    <PriceTicker className="bg-transparent px-0 py-0 rounded-none" />
                    <div className="flex items-center gap-1">
                      {SOCIALS.map(({ label, href, Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="flex size-9 items-center justify-center rounded-lg text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-bitcoin"
                        >
                          <Icon className="size-[18px]" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={TELEGRAM_INVITE}
                    className="flex items-center justify-center gap-2 rounded-xl bg-bitcoin px-5 py-3 font-semibold text-black transition-colors hover:bg-bitcoin-dark"
                    onClick={() => {
                      fbEvent("Lead");
                      closeMobile();
                    }}
                  >
                    Join the community
                    <Rocket className="size-4" />
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

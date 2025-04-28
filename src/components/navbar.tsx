"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(
    "socials"
  );

  // Hover effect state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation items
  const navItems = [
    { label: "Learn", dropdown: "learn" },
    { label: "Community", dropdown: "community" },
    { label: "FAQ", href: "#faq" },
    { label: "Resources", dropdown: "resources" },
  ];

  // Update hover indicator position
  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number, dropdown?: string) => {
    setHoveredIndex(index);
    if (dropdown) {
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setActiveDropdown(null);
  };

  const toggleMobileSection = (section: string) => {
    if (activeMobileSection === section) {
      setActiveMobileSection(null);
    } else {
      setActiveMobileSection(section);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-4 relative">
        <div
          className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-zinc-800/50 shadow-lg overflow-visible"
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Navigation Bar */}
          <div className="flex items-center justify-between h-16 px-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/bitcoindeepa-h-logo.svg"
                alt="BitcoinDeepa"
                width={160}
                height={32}
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Center Navigation */}
            <nav className="hidden md:flex items-center relative">
              {/* Hover Highlight */}
              <div
                className="absolute h-[30px] transition-all duration-300 ease-out bg-white/10 rounded-[6px] flex items-center"
                style={{
                  ...hoverStyle,
                  opacity: hoveredIndex !== null ? 1 : 0,
                }}
              />

              {/* Navigation Items */}
              <div className="relative flex space-x-1 items-center">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => (tabRefs.current[index] = el)}
                    className={`px-4 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                      index === activeIndex ? "text-white" : "text-gray-300"
                    }`}
                    onMouseEnter={() => handleMouseEnter(index, item.dropdown)}
                    onClick={() => item.href && setActiveIndex(index)}
                  >
                    <div className="text-sm font-medium leading-5 whitespace-nowrap flex items-center justify-center h-full">
                      {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                      ) : (
                        item.label
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              {/* <Link
                href="#login"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md font-medium"
              >
                Login
              </Link> */}
              <Link
                href="#join"
                className="px-5 py-2 text-sm font-medium text-white bg-bitcoin hover:bg-bitcoin-dark transition-colors rounded-full flex items-center"
              >
                Join the Community
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-bitcoin"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-bitcoin rounded-full"></span>
                  <span className="w-full h-0.5 bg-bitcoin rounded-full"></span>
                  <span className="w-full h-0.5 bg-bitcoin rounded-full"></span>
                </div>
              )}
            </button>
          </div>

          {/* Dropdown Menus - Card Style */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-1 z-50 px-4 sm:px-6 lg:px-8"
              >
                <div className="bg-zinc-900/70 backdrop-blur-lg rounded-xl border border-zinc-800/50 shadow-xl overflow-hidden">
                  {activeDropdown === "learn" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                      <div className="bg-bitcoin rounded-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-white font-semibold mb-1">
                            Bitcoindeepa Blog
                          </h3>
                          <p className="text-white/80 text-sm mb-4 font-light">
                            Start your journey into Bitcoin
                          </p>
                          <Link
                            href="https://blog.bitcoindeepa.com"
                            className="text-white text-sm font-medium hover:underline inline-flex items-center"
                          >
                            Explore guides →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-bitcoin"
                              >
                                <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
                                <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
                                <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                                <path d="M12 10v12" />
                                <path d="M12 22c4.2 0 7-1.67 7-5" />
                                <path d="M10 10.5V14" />
                                <path d="M14 10.5V14" />
                                <path d="M10 14a2 2 0 1 0 4 0" />
                                <path d="M6 10.5V14" />
                                <path d="M18 10.5V14" />
                                <path d="M6 14a2 2 0 1 0 4 0" />
                                <path d="M18 14a2 2 0 0 1-4 0" />
                              </svg>
                            </div>
                            <h3 className="text-white font-semibold">
                              Wallets & Security
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Learn how to secure your Bitcoin
                          </p>
                          <Link
                            href="#wallets"
                            className="text-bitcoin text-sm font-medium hover:underline mt-2 inline-flex items-center"
                          >
                            Learn more →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-bitcoin"
                              >
                                <path
                                  d="M12 16L7 11M12 16L17 11M12 16V4M21 20H3"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <h3 className="text-white font-semibold">
                              Lightning Network
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Discover fast & cheap Bitcoin transactions
                          </p>
                          <Link
                            href="#lightning"
                            className="text-bitcoin text-sm font-medium hover:underline mt-2 inline-flex items-center"
                          >
                            Learn more →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDropdown === "community" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                      <div className="bg-bitcoin rounded-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-white font-semibold mb-1">
                            Events & Meetups
                          </h3>
                          <p className="text-white/80 text-sm mb-4 font-light">
                            Connect with Bitcoiners in Sri Lanka
                          </p>
                          <Link
                            href="#events"
                            className="text-white text-sm font-medium hover:underline inline-flex items-center"
                          >
                            View calendar →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-bitcoin"
                              >
                                <path
                                  d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M3 21C3 17.134 7.02944 14 12 14C16.9706 14 21 17.134 21 21"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            <h3 className="text-white font-semibold">
                              Join Our Telegram
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Connect with our active community
                          </p>
                          <Link
                            href="#telegram"
                            className="text-bitcoin text-sm font-medium hover:underline mt-2 inline-flex items-center"
                          >
                            Join now →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-bitcoin"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M2 12H22"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                            <h3 className="text-white font-semibold">
                              Global Network
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Connect with Bitcoiners worldwide
                          </p>
                          <Link
                            href="#global"
                            className="text-bitcoin text-sm font-medium hover:underline mt-2 inline-flex items-center"
                          >
                            Explore →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDropdown === "resources" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                      <div className="bg-bitcoin rounded-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-white font-semibold mb-1">
                            Learning Hub
                          </h3>
                          <p className="text-white/80 text-sm mb-4 font-light">
                            Educational resources for all levels
                          </p>
                          <Link
                            href="#resources"
                            className="text-white text-sm font-medium hover:underline inline-flex items-center"
                          >
                            Browse resources →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-bitcoin"
                              >
                                <path
                                  d="M12 6.25278V19.2528M12 6.25278L6.5 10.0028M12 6.25278L17.5 10.0028M3 17.2528V8.75278C3 8.34038 3.18273 7.95278 3.48986 7.75278L11.4899 3.25278C11.8094 3.03054 12.1906 3.03054 12.5101 3.25278L20.5101 7.75278C20.8173 7.95278 21 8.34038 21 8.75278V17.2528C21 17.6652 20.8173 18.0528 20.5101 18.2528L12.5101 22.7528C12.1906 22.975 11.8094 22.975 11.4899 22.7528L3.48986 18.2528C3.18273 18.0528 3 17.6652 3 17.2528Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <h3 className="text-white font-semibold">
                              Developer Resources
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Build on Bitcoin and Lightning
                          </p>
                          <Link
                            href="#dev"
                            className="text-bitcoin text-sm font-medium hover:underline mt-2 inline-flex items-center"
                          >
                            Get started →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-bitcoin"
                              >
                                <path
                                  d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            <h3 className="text-white font-semibold">
                              Whitepapers & Research
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Deep dive into Bitcoin technology
                          </p>
                          <Link
                            href="#research"
                            className="text-bitcoin text-sm font-medium hover:underline mt-2 inline-flex items-center"
                          >
                            Read papers →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu - Part of the same container */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden rounded-b-3xl border-t border-zinc-800/50"
              >
                <div className="p-4 space-y-2">
                  {/* Community Section */}
                  <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center"
                      onClick={() => toggleMobileSection("community")}
                    >
                      <span className="text-bitcoin font-medium">
                        COMMUNITY
                      </span>
                      <span className="text-orange-500">→</span>
                    </button>
                  </div>

                  {/* FAQ Section */}
                  <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center"
                      onClick={() => toggleMobileSection("faq")}
                    >
                      <span className="text-bitcoin font-medium">FAQ</span>
                      <span className="text-orange-500">→</span>
                    </button>
                  </div>

                  {/* Resources Section */}
                  <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center"
                      onClick={() => toggleMobileSection("resources")}
                    >
                      <span className="text-bitcoin font-medium">
                        RESOURCES
                      </span>
                      <span className="text-orange-500">→</span>
                    </button>
                  </div>

                  {/* Socials Section */}
                  <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center"
                      onClick={() => toggleMobileSection("socials")}
                    >
                      <span className="text-bitcoin font-medium">SOCIALS</span>
                      <span className="text-orange-500">
                        {activeMobileSection === "socials" ? "↓" : "→"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {activeMobileSection === "socials" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-zinc-900/80"
                        >
                          <div className="p-4 flex justify-around">
                            <Link
                              href="https://x.com/pearlofsatoshi"
                              className="flex flex-col items-center text-white hover:text-orange-400 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mb-1"
                              >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                              </svg>
                              <span className="text-sm">X (Twitter)</span>
                            </Link>
                            <Link
                              href="#telegram-channel"
                              className="flex flex-col items-center text-white hover:text-orange-400 transition-colors"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mb-1"
                              >
                                <path d="M21.99 7.95c-.1-.6-.6-1.05-1.2-1.15l-17.6-2.7c-.7-.1-1.4.4-1.5 1.1 0 .1 0 .2 0 .3v8.7c0 .6.4 1.1.9 1.2l8.8 2.1c.1 0 .2 0 .3 0 .3 0 .6-.1.8-.3l9-8.5c.5-.4.6-1.1.2-1.6 0-.1-.1-.1-.1-.2z"></path>
                                <path d="M10 21.9c.5.1 1.1-.2 1.3-.7.1-.2.1-.4.1-.6v-8.3c0-.5-.3-.9-.8-1.1l-8.8-3c-.7-.2-1.4.1-1.6.8-.1.2-.1.4 0 .6l1.9 9.3c.1.5.5.9 1 1l6.9 2z"></path>
                              </svg>
                              <span className="text-sm">Telegram</span>
                            </Link>
                            <Link
                              href="#instagram"
                              className="flex flex-col items-center text-white hover:text-orange-400 transition-colors"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mb-1"
                              >
                                <rect
                                  x="2"
                                  y="2"
                                  width="20"
                                  height="20"
                                  rx="5"
                                  ry="5"
                                ></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line
                                  x1="17.5"
                                  y1="6.5"
                                  x2="17.51"
                                  y2="6.5"
                                ></line>
                              </svg>
                              <span className="text-sm">Instagram</span>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Join Button */}
                  <Link
                    href="#join"
                    className="block mt-4 px-5 py-3 text-center font-medium text-white bg-bitcoin hover:bg-bitcoin-dark transition-colors rounded-lg flex items-center justify-center"
                  >
                    Join the community
                    <Rocket className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

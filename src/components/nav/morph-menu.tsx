"use client";

/**
 * Desktop navigation with a morphing dropdown (React + framer-motion):
 *
 * - One shared panel sits under the nav. When the pointer moves between
 *   triggers it morphs (x, width, height) to the next menu instead of closing
 *   and reopening, and the content slides in from the direction of travel.
 * - The panel is centred on the hovered trigger and clamped inside the header.
 * - It closes 50ms after the pointer leaves both the triggers and the panel.
 * - Keyboard: Enter/Space opens and focuses the first link, Escape closes and
 *   returns focus to the trigger, tabbing out of the menu closes it.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ExternalArrow } from "../icons";
import { fbEvent } from "@/src/lib/facebook-pixel";
import { cn } from "@/src/lib/utils";
import { NAV_LINKS, NAV_MENUS, type NavFeature, type NavLinkItem, type NavMenu } from "./nav-data";

const MORPH: Transition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };
const SLIDE_DISTANCE = 60;
const CLOSE_DELAY_MS = 50;
const EDGE_GUTTER = 8;

interface PanelBox {
  x: number;
  width: number;
  height: number;
  caretX: number;
}

export function MenuItem({ item, onNavigate }: { item: NavLinkItem; onNavigate: () => void }) {
  const { Icon } = item;
  // A compact list row: the duotone icon inline (no tile), a title and one
  // line of caption. Every row is the same height, so panels never jump.
  const content = (
    <>
      <Icon className="size-5 shrink-0 text-bitcoin" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 text-sm leading-5 font-medium text-white">
          {item.title}
          {item.external && (
            <ExternalArrow className="ml-0.5 shrink-0 text-zinc-500" />
          )}
        </span>
        <span className="block truncate text-sm leading-5 text-zinc-400">{item.description}</span>
      </span>
    </>
  );
  // Radius 6px inside the panel's 6px padding: concentric with its 12px corners.
  const className =
    "group flex items-center gap-3 rounded-md px-3 py-2.5 outline-none transition-colors hover:bg-zinc-800 focus-visible:bg-zinc-800";
  const onClick = () => {
    if (item.lead) fbEvent("Lead");
    onNavigate();
  };
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className} onClick={onClick}>
      {content}
    </Link>
  );
}

const TILE_SIZES = "208px";

/** next/image's optimised srcset for a tile, shared by the tile and the idle preload. */
function tileImageProps(feature: NavFeature) {
  const { src, width, height, alt } = feature.image;
  return getImageProps({ src, width, height, alt, sizes: TILE_SIZES, quality: 80 }).props;
}

function FeatureTile({ feature, onNavigate }: { feature: NavFeature; onNavigate: () => void }) {
  const { alt, ...img } = tileImageProps(feature);
  const content = (
    <>
      <span className="relative block min-h-0 flex-1 overflow-hidden bg-zinc-950">
        {/* eslint-disable-next-line @next/next/no-img-element -- props come from getImageProps */}
        <img {...img} alt={alt} className="absolute inset-0 size-full object-cover" />
        {feature.video && (
          <video
            src={feature.video}
            poster={img.src}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="absolute inset-0 size-full object-cover motion-reduce:hidden"
          />
        )}
      </span>
      <span className="block px-3 py-2.5">
        <span className="flex items-center gap-1 text-sm leading-5 font-medium text-white">
          {feature.title}
          {feature.external && (
            <ExternalArrow className="ml-0.5 shrink-0 text-zinc-500" />
          )}
        </span>
        <span className="block truncate text-sm leading-5 text-zinc-400">{feature.caption}</span>
      </span>
    </>
  );
  // Same 6px radius as the rows: concentric with the panel's 12px corners.
  const className =
    "group/tile flex w-[208px] shrink-0 flex-col overflow-hidden rounded-md bg-zinc-800 outline-none transition-colors hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-bitcoin";
  return feature.external ? (
    <a href={feature.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
      {content}
    </a>
  ) : (
    <Link href={feature.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

function MenuContent({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  // Links in one column, the feature tile beside them. Every panel is the
  // same width, so switching menus only morphs the height.
  return (
    <div className="flex gap-1.5 p-1.5">
      <ul className="grid w-[284px] content-start gap-0.5">
        {menu.items.map((item) => (
          <li key={item.href}>
            <MenuItem item={item} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      {menu.feature && <FeatureTile feature={menu.feature} onNavigate={onNavigate} />}
    </div>
  );
}

/** Warm the tile images once the page is idle, so a first hover never shows an empty tile. */
function usePreloadTiles() {
  useEffect(() => {
    const preload = () => {
      for (const menu of NAV_MENUS) {
        if (!menu.feature) continue;
        const props = tileImageProps(menu.feature);
        const img = new window.Image();
        // sizes before srcset, so the browser picks the same candidate as the tile.
        img.sizes = props.sizes ?? TILE_SIZES;
        if (props.srcSet) img.srcset = props.srcSet;
        img.src = props.src;
      }
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(preload, 2000);
    return () => clearTimeout(id);
  }, []);
}

export function MorphMenu({ boundsRef }: { boundsRef: React.RefObject<HTMLElement | null> }) {
  const panelId = useId();
  usePreloadTiles();
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const contentRefs = useRef(new Map<string, HTMLElement>());
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [openId, setOpenId] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  // True for the first frame after opening from closed: place the panel
  // without morphing from wherever it was last time.
  const [instant, setInstant] = useState(true);
  const [box, setBox] = useState<PanelBox>({ x: 0, width: 0, height: 0, caretX: 0 });
  const [hover, setHover] = useState<{ left: number; width: number } | null>(null);
  const focusFirstOnOpen = useRef(false);

  const openMenu = openId ? NAV_MENUS.find((m) => m.id === openId) ?? null : null;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openIdRef = useRef<string | null>(null);

  const close = useCallback(() => {
    cancelClose();
    openIdRef.current = null;
    setOpenId(null);
  }, []);

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(close, CLOSE_DELAY_MS);
  };

  const open = (id: string) => {
    cancelClose();
    const prev = openIdRef.current;
    if (prev === id) return;
    if (prev === null) {
      setDirection(0);
      setInstant(true);
    } else {
      const from = NAV_MENUS.findIndex((m) => m.id === prev);
      const to = NAV_MENUS.findIndex((m) => m.id === id);
      setDirection(to > from ? 1 : -1);
      setInstant(false);
    }
    openIdRef.current = id;
    setOpenId(id);
  };

  // Position the panel under the open trigger, sized to its content.
  useLayoutEffect(() => {
    if (!openId) return;
    const nav = navRef.current;
    const trigger = triggerRefs.current.get(openId);
    const content = contentRefs.current.get(openId);
    if (!nav || !trigger || !content) return;

    const navRect = nav.getBoundingClientRect();
    const t = trigger.getBoundingClientRect();
    const width = content.offsetWidth;
    const height = content.offsetHeight;
    const triggerCenter = t.left + t.width / 2 - navRect.left;

    let x = triggerCenter - width / 2;
    const bounds = boundsRef.current?.getBoundingClientRect();
    if (bounds) {
      const min = bounds.left + EDGE_GUTTER - navRect.left;
      const max = bounds.right - EDGE_GUTTER - width - navRect.left;
      x = Math.min(Math.max(x, min), Math.max(min, max));
    }
    setBox({ x, width, height, caretX: triggerCenter - x });
    setHover({ left: t.left - navRect.left, width: t.width });
  }, [openId, boundsRef]);

  // After the first positioned frame, allow morphing.
  useEffect(() => {
    if (!instant || !openId) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant, openId, box]);

  // Move focus into the panel when opened from the keyboard.
  useEffect(() => {
    if (!openId || !focusFirstOnOpen.current) return;
    focusFirstOnOpen.current = false;
    const first = contentRefs.current.get(openId)?.querySelector<HTMLElement>("a, button");
    first?.focus();
  }, [openId]);

  // Escape closes from anywhere; resizing closes (positions would be stale).
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = triggerRefs.current.get(openId);
      close();
      trigger?.focus();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [openId, close]);

  useEffect(() => cancelClose, []);

  const onTriggerPointerEnter = (e: ReactPointerEvent, id: string) => {
    if (e.pointerType === "mouse") open(id);
  };

  const onTriggerKeyDown = (e: ReactKeyboardEvent, id: string) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusFirstOnOpen.current = true;
      open(id);
    }
  };

  const showHover = (el: HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;
    const n = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setHover({ left: r.left - n.left, width: r.width });
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative"
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") {
          scheduleClose();
          setHover(null);
        }
      }}
      onPointerEnter={cancelClose}
      onBlur={(e) => {
        if (!navRef.current?.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      {/* Sliding solid highlight behind the hovered/open trigger. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-1/2 h-8 -translate-y-1/2 rounded-lg bg-zinc-800"
        initial={false}
        animate={hover ? { left: hover.left, width: hover.width, opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />

      <ul className="relative flex items-center gap-1">
        {NAV_MENUS.map((menu) => {
          const isOpen = openId === menu.id;
          return (
            <li key={menu.id}>
              <button
                ref={(el) => {
                  if (el) triggerRefs.current.set(menu.id, el);
                  else triggerRefs.current.delete(menu.id);
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onPointerEnter={(e) => {
                  onTriggerPointerEnter(e, menu.id);
                  showHover(e.currentTarget);
                }}
                onClick={(e) => {
                  // Keyboard activation (detail 0) moves focus into the menu.
                  if (e.detail === 0) focusFirstOnOpen.current = !isOpen;
                  if (isOpen && e.detail === 0) close();
                  else open(menu.id);
                }}
                onKeyDown={(e) => onTriggerKeyDown(e, menu.id)}
                onFocus={(e) => showHover(e.currentTarget)}
                className={cn(
                  "relative flex h-8 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-bitcoin",
                  isOpen ? "text-white" : "text-zinc-300 hover:text-white",
                )}
              >
                {menu.label}
                <ChevronDown
                  aria-hidden
                  className={cn("size-3.5 text-zinc-500 transition-transform duration-300", isOpen && "rotate-180 text-bitcoin")}
                />
              </button>
            </li>
          );
        })}
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") close();
                showHover(e.currentTarget);
              }}
              onFocus={(e) => {
                close();
                showHover(e.currentTarget);
              }}
              className="relative flex h-8 items-center rounded-lg px-3 text-sm font-medium text-zinc-300 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-bitcoin"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Morphing panel. The top padding is an invisible hover bridge between
          the trigger row and the panel. */}
      <motion.div
        id={panelId}
        className="absolute top-full left-0 pt-7"
        style={{ pointerEvents: openMenu ? "auto" : "none" }}
        initial={false}
        animate={{
          opacity: openMenu ? 1 : 0,
          y: openMenu ? 0 : 12,
          x: box.x,
        }}
        transition={{
          opacity: { duration: 0.2 },
          y: MORPH,
          x: instant ? { duration: 0 } : MORPH,
        }}
        aria-hidden={!openMenu}
      >
        <motion.div
          className="relative rounded-xl bg-zinc-900 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)] ring-1 ring-zinc-800"
          initial={false}
          animate={{ width: box.width, height: box.height }}
          transition={instant ? { duration: 0 } : MORPH}
        >
          {/* Caret pointing at the trigger. */}
          <motion.span
            aria-hidden
            // Rotation goes through framer (not a rotate-45 class) so it is
            // composed after the x translation instead of before it.
            className="absolute -top-1.5 left-0 size-3 rounded-[2px] border-t border-l border-zinc-800 bg-zinc-900"
            initial={false}
            animate={{ x: box.caretX - 6, rotate: 45 }}
            transition={instant ? { duration: 0 } : MORPH}
          />
          <div className="relative size-full overflow-hidden rounded-xl">
            {/* Entering and exiting menus are both absolute, so they overlap
                while one slides out and the next slides in. */}
            <AnimatePresence initial={false} custom={direction}>
              {openMenu && (
                <motion.div
                  key={openMenu.id}
                  ref={(el: HTMLDivElement | null) => {
                    if (el) contentRefs.current.set(openMenu.id, el);
                  }}
                  custom={direction}
                  className="absolute top-0 left-0"
                  variants={{
                    enter: (d: number) => ({ x: d * SLIDE_DISTANCE, opacity: d === 0 ? 1 : 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d * -SLIDE_DISTANCE, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={MORPH}
                >
                  <MenuContent menu={openMenu} onNavigate={close} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </nav>
  );
}

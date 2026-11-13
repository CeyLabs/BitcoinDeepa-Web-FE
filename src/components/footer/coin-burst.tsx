"use client";

import { useCallback, useEffect } from "react";
import { BTC_COIN_SVG, SATS_COIN_SVG } from "./coins";

/*
 * Coin burst for the footer heart, drawn on one fixed canvas.
 *
 * Each coin is rasterised once (with its shadow baked in), then every frame
 * is a handful of drawImage calls: no DOM nodes, no filters, no React
 * renders. Clicking again just adds coins to the same loop, so rapid clicks
 * stay smooth. The canvas is removed when the last coin has landed.
 */

const COUNT = 22;
const MAX_COINS = 160; // rapid clicks: the oldest coins make way
const GRAVITY = 1500; // px/s²
const SPRITE = 72; // raster size of a coin, CSS px before DPR
const PAD = 10; // room for the baked shadow

type Coin = {
  sprite: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  flip: number;
  vflip: number;
  age: number;
  life: number;
};

let sprites: HTMLCanvasElement[] | null = null;
let spritesLoading: Promise<HTMLCanvasElement[]> | null = null;

function rasterise(svg: string, dpr: number): Promise<HTMLCanvasElement> {
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  return img.decode().then(() => {
    const px = Math.round((SPRITE + PAD * 2) * dpr);
    const c = document.createElement("canvas");
    c.width = px;
    c.height = px;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    ctx.drawImage(img, PAD, PAD, SPRITE, SPRITE);
    return c;
  });
}

function loadSprites(dpr: number) {
  spritesLoading ??= Promise.all([rasterise(BTC_COIN_SVG, dpr), rasterise(SATS_COIN_SVG, dpr)]).then((s) => {
    sprites = s;
    return s;
  });
  return spritesLoading;
}

const coins: Coin[] = [];
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let frame = 0;
let last = 0;

function fit() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function mount() {
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "70",
  });
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  fit();
  window.addEventListener("resize", fit);
}

function unmount() {
  cancelAnimationFrame(frame);
  frame = 0;
  window.removeEventListener("resize", fit);
  canvas?.remove();
  canvas = null;
  ctx = null;
}

function tick(now: number) {
  if (!ctx || !canvas || !sprites) return;
  const dt = Math.min((now - last) / 1000, 1 / 30);
  last = now;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = canvas.width / w;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i];
    c.age += dt;
    if (c.age < 0) continue; // still waiting on its small launch delay
    c.vy += GRAVITY * dt;
    c.x += c.vx * dt;
    c.y += c.vy * dt;
    c.vx *= 1 - 0.6 * dt; // a little air drag
    c.rot += c.vrot * dt;
    c.flip += c.vflip * dt;
    if (c.age > c.life || c.y > h + 60) {
      coins.splice(i, 1);
      continue;
    }

    const t = c.age / c.life;
    const alpha = t > 0.75 ? 1 - (t - 0.75) / 0.25 : 1;
    const grow = c.age < 0.15 ? 0.6 + (c.age / 0.15) * 0.4 : 1;
    // Turning on its vertical axis: the face narrows to an edge and back.
    const turn = Math.max(0.12, Math.abs(Math.cos(c.flip)));
    const s = (c.size / SPRITE) * grow;
    const full = (SPRITE + PAD * 2) * s;

    ctx.globalAlpha = alpha;
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rot);
    ctx.scale(turn, 1);
    ctx.drawImage(sprites[c.sprite], -full / 2, -full / 2, full, full);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  ctx.globalAlpha = 1;

  if (coins.length > 0) frame = requestAnimationFrame(tick);
  else unmount();
}

function throwCoins(x: number, y: number) {
  for (let i = 0; i < COUNT; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.85;
    const speed = 480 + Math.random() * 420;
    coins.push({
      sprite: Math.random() < 0.45 ? 0 : 1,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 18 + Math.random() * 16,
      rot: 0,
      vrot: (Math.random() - 0.5) * 9,
      flip: Math.random() * Math.PI,
      vflip: 6 + Math.random() * 10,
      age: -Math.random() * 0.06,
      life: 1.5 + Math.random() * 0.6,
    });
  }
  if (coins.length > MAX_COINS) coins.splice(0, coins.length - MAX_COINS);
}

/** Returns `burst(x, y)` in viewport coordinates. Does nothing for reduced motion. */
export function useCoinBurst() {
  useEffect(() => {
    // Rasterise the two coins while idle so the first click starts instantly.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const id = window.setTimeout(() => void loadSprites(dpr), 1500);
    return () => {
      window.clearTimeout(id);
      coins.length = 0;
      unmount();
    };
  }, []);

  return useCallback((x: number, y: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    loadSprites(Math.min(window.devicePixelRatio || 1, 2)).then(() => {
      throwCoins(x, y);
      mount();
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
  }, []);
}

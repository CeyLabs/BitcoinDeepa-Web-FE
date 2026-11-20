"use client";

import type React from "react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import { useInView, useReducedMotion } from "framer-motion";
import { CardPlaceholder, FRONT_SRC, BACK_SRC } from "./card-placeholder";

// Card proportions follow the artwork (945x591, close to ISO ID-1), with
// a thin body so the edge catches light when it turns.
const W = 3.4;
const H = W / (945 / 591);
const DEPTH = 0.028;
const RADIUS = 0.13;
const BEVEL = 0.006;
const FACE_Z = DEPTH / 2 + BEVEL + 0.0006;
const DRAG_SENSITIVITY = 0.0085; // radians per pixel

// Satin printed face, like a real PVC card: a soft, broad sheen rather than
// a mirror. The artwork stays true to colour (emissive) under any light.
const faceMaterial = {
  roughness: 0.6,
  metalness: 0,
  clearcoat: 0.45,
  clearcoatRoughness: 0.42,
  emissive: new THREE.Color("#ffffff"),
  emissiveIntensity: 0.62,
};

/** Shared between the DOM pointer handlers and the render loop. */
type Motion = {
  rotY: number;
  vel: number;
  target: number | null;
  dragging: boolean;
  hoverX: number;
  hoverY: number;
  lastInteract: number;
};

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** A rounded-rect face with UVs spanning the whole card, so the artwork maps 1:1. */
function faceGeometry(shape: THREE.Shape) {
  const g = new THREE.ShapeGeometry(shape, 24);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H);
  }
  uv.needsUpdate = true;
  return g;
}

function Card({ motion, reduceMotion, onReady }: { motion: React.RefObject<Motion>; reduceMotion: boolean; onReady: () => void }) {
  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const idle = useRef(0);
  const hover = useRef({ x: 0, y: 0 });
  const [front, back] = useTexture([FRONT_SRC, BACK_SRC]);

  const { body, face } = useMemo(() => {
    const shape = roundedRect(W, H, RADIUS);
    const body = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL,
      bevelSegments: 4,
      curveSegments: 24,
    });
    body.translate(0, 0, -DEPTH / 2);
    return { body, face: faceGeometry(shape) };
  }, []);

  useEffect(() => {
    for (const t of [front, back]) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 16;
      t.needsUpdate = true;
    }
    onReady();
  }, [front, back, onReady]);

  useFrame((state, rawDt) => {
    const m = motion.current;
    const dt = Math.min(rawDt, 1 / 30);
    const t = state.clock.elapsedTime;

    if (!m.dragging) {
      if (m.target === null) {
        // Free spin after a flick, losing speed like a real object.
        m.rotY += m.vel * dt;
        m.vel *= Math.exp(-2.2 * dt);
        if (Math.abs(m.vel) < 1.6) {
          // Settle on whichever face it is heading towards.
          m.target = Math.round((m.rotY + m.vel * 0.12) / Math.PI) * Math.PI;
        }
      } else {
        // Spring onto the face, with a little overshoot unless reduced motion.
        const k = 38;
        const c = 2 * Math.sqrt(k) * (reduceMotion ? 1 : 0.62);
        m.vel += (k * (m.target - m.rotY) - c * m.vel) * dt;
        m.rotY += m.vel * dt;
      }
    }

    // Idle sway fades in a couple of seconds after the last interaction.
    // Kept small: a reflection moves twice as far as the card turns.
    const resting = !m.dragging && performance.now() - m.lastInteract > 2200 && !reduceMotion;
    idle.current = THREE.MathUtils.damp(idle.current, resting ? 1 : 0, 0.8, dt);
    const sway = Math.sin(t * 0.4) * 0.1 * idle.current;

    // Ease the pointer lean so entering or leaving the card never jumps.
    hover.current.x = THREE.MathUtils.damp(hover.current.x, m.dragging ? 0 : m.hoverX, 2.5, dt);
    hover.current.y = THREE.MathUtils.damp(hover.current.y, m.dragging ? 0 : m.hoverY, 2.5, dt);

    if (spinRef.current) {
      spinRef.current.rotation.y = m.rotY + sway + hover.current.x * 0.06;
    }
    if (tiltRef.current) {
      const g = tiltRef.current;
      const float = reduceMotion ? 0 : 1;
      g.rotation.x = hover.current.y * 0.06 + Math.sin(t * 0.7) * 0.03 * float;
      g.rotation.z = Math.sin(t * 0.5) * 0.015 * float;
      g.position.y = Math.sin(t * 0.9) * 0.06 * float;
    }
  });

  return (
    <group ref={tiltRef}>
      <group ref={spinRef}>
        <mesh geometry={body}>
          <meshPhysicalMaterial color="#161616" metalness={0.3} roughness={0.45} />
        </mesh>
        <mesh geometry={face} position-z={FACE_Z}>
          <meshPhysicalMaterial map={front} emissiveMap={front} {...faceMaterial} />
        </mesh>
        <mesh geometry={face} position-z={-FACE_Z} rotation-y={Math.PI}>
          <meshPhysicalMaterial map={back} emissiveMap={back} {...faceMaterial} />
        </mesh>
      </group>
    </group>
  );
}

/** Studio lighting built from light panels, so no HDR file is downloaded. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      {/* Large, dim softboxes: on a satin face they show up as a gentle
          brightening that drifts as the card turns, not a hard streak. */}
      <Lightformer form="rect" intensity={1.2} position={[-3, 3, 8]} scale={[8, 6, 1]} />
      <Lightformer form="rect" intensity={1.5} position={[0, 7, 3]} scale={[14, 3, 1]} />
      <Lightformer form="rect" intensity={0.8} position={[7, 0, 2]} scale={[2, 10, 1]} />
      <Lightformer form="rect" intensity={0.8} position={[-7, 0, 2]} scale={[2, 10, 1]} />
    </Environment>
  );
}

/** A floating, glossy 3D Bitcoin Deepa Card you can grab and spin. */
export default function CardScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useInView(wrapRef, { margin: "200px" });
  const reduceMotion = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);
  const onReady = useMemo(() => () => setReady(true), []);

  const motion = useRef<Motion>({
    rotY: 0,
    vel: 0,
    target: 0,
    dragging: false,
    hoverX: 0,
    hoverY: 0,
    lastInteract: 0,
  });
  const drag = useRef({ startX: 0, lastX: 0, lastT: 0, moved: false });

  const flip = (dir = 1) => {
    const m = motion.current;
    const base = m.target ?? Math.round(m.rotY / Math.PI) * Math.PI;
    m.target = base + dir * Math.PI;
    m.lastInteract = performance.now();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const m = motion.current;
    m.dragging = true;
    m.target = null;
    m.vel = 0;
    m.lastInteract = performance.now();
    drag.current = { startX: e.clientX, lastX: e.clientX, lastT: performance.now(), moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const m = motion.current;
    if (e.pointerType === "mouse" && !reduceMotion) {
      const r = e.currentTarget.getBoundingClientRect();
      m.hoverX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      m.hoverY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
    if (!m.dragging) return;
    const d = drag.current;
    const now = performance.now();
    const dx = e.clientX - d.lastX;
    const dt = Math.max((now - d.lastT) / 1000, 0.008);
    m.rotY += dx * DRAG_SENSITIVITY;
    m.vel = THREE.MathUtils.lerp(m.vel, (dx * DRAG_SENSITIVITY) / dt, 0.5);
    if (Math.abs(e.clientX - d.startX) > 5) d.moved = true;
    d.lastX = e.clientX;
    d.lastT = now;
    m.lastInteract = now;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    const m = motion.current;
    if (!m.dragging) return;
    m.dragging = false;
    m.lastInteract = performance.now();
    if (!cancelled && !drag.current.moved) {
      m.vel = 0;
      flip(e.clientX > (e.currentTarget.getBoundingClientRect().left + e.currentTarget.clientWidth / 2) ? 1 : -1);
      return;
    }
    // A held-still release shouldn't fling the card.
    if (performance.now() - drag.current.lastT > 90) m.vel = 0;
    if (reduceMotion) m.vel = Math.max(-6, Math.min(6, m.vel));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      flip(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      flip(-1);
    }
  };

  return (
    <div
      ref={wrapRef}
      role="button"
      tabIndex={0}
      aria-label="Bitcoin Deepa Card in 3D. Drag to spin it, or press Enter to flip it over."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => endDrag(e)}
      onPointerCancel={(e) => endDrag(e, true)}
      onPointerLeave={() => {
        motion.current.hoverX = 0;
        motion.current.hoverY = 0;
      }}
      onKeyDown={onKeyDown}
      className="relative aspect-[3/2] w-full max-w-[620px] cursor-grab touch-pan-y rounded-xl outline-none select-none focus-visible:ring-2 focus-visible:ring-bitcoin active:cursor-grabbing"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <CardPlaceholder />
      </div>
      {/* Soft floor shadow in CSS: a per-frame WebGL shadow pass costs far more. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute bottom-[9%] left-1/2 h-7 w-[60%] -translate-x-1/2 rounded-[50%] bg-black/80 blur-2xl transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      />
      <Canvas
        className={`transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
        dpr={[1, 2]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 32 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        fallback={<CardPlaceholder />}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[2, 4, 6]} intensity={0.8} />
        <Suspense fallback={null}>
          <Card motion={motion} reduceMotion={reduceMotion} onReady={onReady} />
          <Studio />
        </Suspense>
      </Canvas>
    </div>
  );
}

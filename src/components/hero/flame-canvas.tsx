"use client";

import type React from "react";
import { useEffect, useRef } from "react";

/**
 * "Deepa Ember": a lamp-flame shader in the Yaka palette. Same maths as the
 * Figma shader fill of the same name, in GLSL for WebGL.
 *  - mode 0: full flame, meant to be masked by the Yaka (lit from within).
 *  - mode 1: sparks only, on a transparent background.
 */
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseOn;
uniform float uMode;

const vec3 EMBER = vec3(0.906, 0.255, 0.149);
const vec3 FLAME = vec3(0.965, 0.573, 0.118);
const vec3 HOT = vec3(1.0, 0.851, 0.627);

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 w = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
}

float fbm(vec2 p) {
  float amp = 0.5;
  float total = 0.0;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    total += amp * vnoise(p);
    p = rot * p;
    amp *= 0.5;
  }
  return total;
}

vec3 ramp(float h) {
  vec3 col = mix(vec3(0.0), EMBER, smoothstep(0.05, 0.4, h));
  col = mix(col, FLAME, smoothstep(0.35, 0.7, h));
  return mix(col, HOT, smoothstep(0.72, 1.05, h));
}

float sparks(vec2 st, float t) {
  float s = 0.0;
  for (int layer = 0; layer < 2; layer++) {
    float fl = float(layer);
    vec2 sp = st * (7.0 + fl * 5.0) + vec2(fl * 3.7, -t * (1.2 + fl * 0.6));
    vec2 cell = floor(sp);
    vec2 local = fract(sp) - 0.5;
    float r = hash21(cell + vec2(fl * 17.0, fl * 3.0));
    vec2 off = vec2(hash21(cell + vec2(3.1, 0.0)) - 0.5, hash21(cell + vec2(7.7, 1.0)) - 0.5) * 0.6;
    float d = length(local - off);
    float life = fract(r * 7.0 + t * 0.35);
    s += step(0.78, r) * smoothstep(0.08, 0.0, d) * sin(life * 3.14159);
  }
  return s;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 st = vec2(uv.x * aspect, uv.y);
  float t = uTime;

  if (uMode > 0.5) {
    float s = sparks(st * 1.4, t) * smoothstep(0.0, 0.35, uv.y);
    vec3 c = mix(FLAME, HOT, clamp(s, 0.0, 1.0));
    float a = clamp(s, 0.0, 1.0) * 0.9;
    gl_FragColor = vec4(c * a, a);
    return;
  }

  vec2 p = st * 3.0;
  vec2 q = vec2(fbm(p + vec2(0.0, -t * 0.7)), fbm(p + vec2(5.2, 1.3) + vec2(0.0, -t * 0.5)));
  float n = fbm(p + 2.2 * q + vec2(0.0, -t * 1.1));

  // Contrast-stretched so dark ember currents and bright tongues both travel
  // through the strokes.
  float heat = smoothstep(0.25, 0.85, n) * (1.1 - 0.3 * st.y) + 0.05 * sin(t * 2.3 + n * 6.0);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float dm = distance(st, m);
  heat += uMouseOn * 0.6 * exp(-dm * dm * 14.0);
  // Never fully cold, so the whole mark stays legible.
  heat = 0.24 + clamp(heat, 0.0, 1.2) * 0.82;

  vec3 col = ramp(heat) + HOT * sparks(st, t) * 0.5;
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export type FlamePointer = { x: number; y: number; on: number };

type Props = {
  mode: 0 | 1;
  pointer: React.RefObject<FlamePointer>;
  paused: boolean;
  still: boolean;
  onReady?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function FlameCanvas({ mode, pointer, paused, still, onReady, className, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!canvas || !gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uMouseOn = gl.getUniformLocation(prog, "uMouseOn");
    gl.uniform1f(gl.getUniformLocation(prog, "uMode"), mode);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Eased pointer so the heat drifts rather than snaps.
    const eased = { x: 0.5, y: 0.5, on: 0 };
    let raf = 0;
    let readySent = false;
    const start = performance.now();

    const draw = (now: number) => {
      const p = pointer.current;
      eased.x += (p.x - eased.x) * 0.08;
      eased.y += (p.y - eased.y) * 0.08;
      eased.on += (p.on - eased.on) * 0.06;
      gl.uniform1f(uTime, still ? 12 : ((now - start) / 1000) * 0.6 + 12);
      gl.uniform2f(uMouse, eased.x, eased.y);
      gl.uniform1f(uMouseOn, eased.on);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!readySent) {
        readySent = true;
        onReady?.();
      }
    };

    const loop = (now: number) => {
      if (!pausedRef.current && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };
    if (still) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [mode, pointer, still, onReady]);

  return <canvas ref={canvasRef} aria-hidden className={className} style={style} />;
}

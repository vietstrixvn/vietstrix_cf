/**
 * useErosionOverlay — Organic dissolution that rises uniformly from bottom to top.
 *
 * The effect works like a "tide coming in":
 * - Dissolution starts at the very bottom of the hero
 * - A single horizontal "wave front" moves upward as the user scrolls
 * - The wave front is organically shaped (large, smooth blobs — NOT random splotches)
 * - Above the wave front: hero is fully visible
 * - Below the wave front: canvas is painted with the bg color (hero hidden)
 *
 * Key design decisions:
 * - Low-frequency Simplex noise (large, few blobs) so the edge looks like
 *   ink spreading through paper, not like a cow's hide
 * - The "wave front" is a horizontal band whose center rises linearly with scroll
 * - A tiny edge-softness zone gives slight organic irregularity without chaos
 */

import { useEffect, useRef, useCallback } from 'react';

// ─── Simplex Noise (2D) ─────────────────────────────────────────────────────

const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const GRAD3: [number, number][] = [
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function buildPerm(seed: number): Uint8Array {
  const perm = new Uint8Array(512);
  const base = new Uint8Array(256);
  for (let i = 0; i < 256; i++) base[i] = i;
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [base[i], base[j]] = [base[j], base[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = base[i & 255];
  return perm;
}

function simplex2D(x: number, y: number, p: Uint8Array): number {
  const s = (x + y) * F2;
  const i = Math.floor(x + s),
    j = Math.floor(y + s);
  const t = (i + j) * G2;
  const x0 = x - (i - t),
    y0 = y - (j - t);
  const i1 = x0 > y0 ? 1 : 0,
    j1 = x0 > y0 ? 0 : 1;
  const x1 = x0 - i1 + G2,
    y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2,
    y2 = y0 - 1 + 2 * G2;
  const ii = i & 255,
    jj = j & 255;
  let n0 = 0,
    n1 = 0,
    n2 = 0;
  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 >= 0) {
    t0 *= t0;
    const g = p[ii + p[jj]] % 8;
    n0 = t0 * t0 * (GRAD3[g][0] * x0 + GRAD3[g][1] * y0);
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 >= 0) {
    t1 *= t1;
    const g = p[ii + i1 + p[jj + j1]] % 8;
    n1 = t1 * t1 * (GRAD3[g][0] * x1 + GRAD3[g][1] * y1);
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 >= 0) {
    t2 *= t2;
    const g = p[ii + 1 + p[jj + 1]] % 8;
    n2 = t2 * t2 * (GRAD3[g][0] * x2 + GRAD3[g][1] * y2);
  }
  return 70 * (n0 + n1 + n2);
}

/**
 * Pre-compute a displacement map (per-pixel noise offset in the Y direction).
 *
 * Each pixel stores a value in [-1, 1] that will be used to displace the
 * "wave front" locally, creating an organic, blob-like edge.
 *
 * We use very LOW frequency (large scale) noise so the blobs are big and
 * few — like puddles, not like a leopard print.
 */
function generateDisplacementMap(
  w: number,
  h: number,
  perm: Uint8Array
): Float32Array {
  const map = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    const ny = y / h;
    for (let x = 0; x < w; x++) {
      const nx = x / w;

      // Large primary blobs — very low frequency
      const n1 = simplex2D(nx * 2.5, ny * 2.5, perm);

      // Medium secondary detail
      const n2 = simplex2D(nx * 5.0 + 17.3, ny * 5.0 + 31.7, perm);

      // Blend: 80% large shape + 20% medium detail
      map[y * w + x] = n1 * 0.8 + n2 * 0.2;
    }
  }
  return map;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

interface ErosionOptions {
  /** Canvas resolution width */
  width?: number;
  /** Canvas resolution height */
  height?: number;
  /** Deterministic seed */
  seed?: number;
  /** Background color to paint where eroded (should match page bg) */
  bgColor?: [number, number, number];
  /**
   * How tall the organic edge band is, as a fraction of canvas height.
   * 0.08 = 8% height → a narrow, crisp wave front
   * 0.20 = 20% height → a wider, slower-looking transition zone
   */
  edgeBandHeight?: number;
  /**
   * Amplitude of the noise displacement as a fraction of canvas height.
   * Controls how "bumpy" the wave front is.
   * 0.04 = modest bumps, 0.12 = very jagged blobs
   */
  displacementAmplitude?: number;
}

/**
 * Creates an erosion overlay canvas that mounts inside the containerRef.
 * Call `updateErosion(progress)` with scroll progress [0, 1] to animate.
 */
export function useErosionOverlay(
  containerRef: React.RefObject<HTMLElement | null>,
  options: ErosionOptions = {}
) {
  const {
    width = 256,
    height = 512,
    seed = 42,
    bgColor = [255, 255, 255],
    edgeBandHeight = 0.10,
    displacementAmplitude = 0.08,
  } = options;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dispMapRef = useRef<Float32Array | null>(null);
  const imgDataRef = useRef<ImageData | null>(null);
  const lastQRef = useRef(-999);

  // Mount canvas overlay into the container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.cssText = `
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 20;
    `;

    const ctx = canvas.getContext('2d', {
      willReadFrequently: false,
      alpha: true,
    });
    if (!ctx) return;

    canvasRef.current = canvas;
    ctxRef.current = ctx;
    imgDataRef.current = ctx.createImageData(width, height);

    // Start fully transparent (hero fully visible)
    ctx.clearRect(0, 0, width, height);

    // Build displacement map
    const perm = buildPerm(seed);
    dispMapRef.current = generateDisplacementMap(width, height, perm);

    container.appendChild(canvas);

    return () => {
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      // Release large data structures for GC
      canvasRef.current = null;
      ctxRef.current = null;
      dispMapRef.current = null;
      imgDataRef.current = null;
    };
  }, [containerRef, width, height, seed]);

  /**
   * Update erosion state.
   *
   * progress [0, 1]:
   *   0   → hero fully visible (wave front below the bottom edge)
   *   0.5 → wave front at the vertical midpoint
   *   1   → hero fully hidden (wave front above the top edge)
   *
   * The wave front is a horizontal band.
   * For each pixel (x, y):
   *   1. Compute the "organic y" = y + displacement[x, y] * amplitude * h
   *   2. Compare organic_y against the wave front position
   *   3. Below → opaque bg color; Above → transparent
   *   4. Inside the narrow edge band → smooth alpha for soft organic edge
   */
  const updateErosion = useCallback(
    (rawProgress: number) => {
      const ctx = ctxRef.current;
      const dispMap = dispMapRef.current;
      const imgData = imgDataRef.current;
      if (!ctx || !dispMap || !imgData) return;

      const ep = Math.min(Math.max(rawProgress, 0), 1);

      // Quantize to ~120 steps to avoid redundant redraws
      const q = Math.round(ep * 120) / 120;
      if (q === lastQRef.current) return;
      lastQRef.current = q;

      if (ep <= 0) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      if (ep >= 1) {
        ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
        ctx.fillRect(0, 0, width, height);
        return;
      }

      const data = imgData.data;
      const [r, g, b] = bgColor;

      // Wave front: starts at the bottom (y=height when ep=0),
      // ends at the top (y=0 when ep=1). Linear movement.
      //
      // We add extra travel (10% padding top & bottom) so:
      //   - ep=0 → wave is completely below the canvas (clean start)
      //   - ep=1 → wave is completely above the canvas (clean end)
      const padding = height * 0.1;
      const waveFrontY = height + padding - ep * (height + 2 * padding);

      const halfBand = edgeBandHeight * height * 0.5;
      const dispAmp = displacementAmplitude * height;

      for (let y = 0; y < height; y++) {
        const rowOffset = y * width;
        for (let x = 0; x < width; x++) {
          // Local organic displacement in Y (makes the edge bumpy)
          const disp = dispMap[rowOffset + x]; // [-1, 1]
          const organicY = y + disp * dispAmp;

          // Distance from the wave front (positive = above front = visible)
          const dist = organicY - waveFrontY;

          let alpha: number;
          if (dist >= halfBand) {
            // Well BELOW wave front (large y, toward bottom) → fully opaque (hero hidden)
            alpha = 255;
          } else if (dist <= -halfBand) {
            // Well ABOVE wave front (small y, toward top) → fully transparent (hero visible)
            alpha = 0;
          } else {
            // Inside the edge band → smooth transition
            const t = (dist + halfBand) / (2 * halfBand); // [0→1] maps top→bottom of band
            // Smoothstep: bottom of band = opaque, top = transparent
            const smooth = t * t * (3 - 2 * t);
            alpha = Math.round(smooth * 255);
          }

          const px = (rowOffset + x) * 4;
          data[px] = r;
          data[px + 1] = g;
          data[px + 2] = b;
          data[px + 3] = alpha;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    },
    [width, height, bgColor, edgeBandHeight, displacementAmplitude]
  );

  return { updateErosion, updateMask: updateErosion };
}

export const useErosionMask = useErosionOverlay;

// Blinking Squares — Originkit
// Using component defaults.
'use client'

const RenderTarget = {
    current: () => "preview",
    canvas: "canvas",
    export: "export",
    thumbnail: "thumbnail",
    preview: "preview",
}
import { useEffect, useRef } from "react"

/**
 * Blinking Squares
 *
 * A grid of little squares that quietly twinkle. Each cell has its own
 * independent phase + speed so the field never pulses in sync. A directional
 * fade controls overall density (dense -> empty along an edge), and an
 * optional cursor halo brightens squares near the pointer.
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 600
 * @framerIntrinsicHeight 400
 */
export default function BlinkingSquares(props: any) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        gridSize,
        fillPercent,
        colorMode,
        squareColor,
        colors,
        twinkleSpeed,
        opacity,
        fadeDirection,
        fadePercent,
        fadeIntensity,
        hasCursorInteraction,
        cursorRadius,
        cursorBoost,
        style,
    } = props

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)
    const sizeRef = useRef({ w: 0, h: 0 })
    const cellsRef = useRef<
        Array<{ phase: number; rate: number; tint: number }>
    >([])
    const cellsKeyRef = useRef<string>("")
    const startRef = useRef<number>(performance.now())
    const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
        x: -9999,
        y: -9999,
        active: false,
    })

    // Freeze ONLY on true static renders (export / thumbnail). The Framer
    // canvas and Preview run the live rAF loop so the squares blink while
    // editing. Gating on useIsStaticRenderer() (true on canvas) is what
    // previously froze it to a single frame.
    const renderTarget = RenderTarget.current()
    const isStaticRenderer =
        renderTarget === RenderTarget.export ||
        renderTarget === RenderTarget.thumbnail

    // Cell generation: stable per (gridSize, area). Different rate/phase per cell.
    function ensureCells(cols: number, rows: number) {
        const key = `${cols}x${rows}`
        if (
            cellsKeyRef.current === key &&
            cellsRef.current.length === cols * rows
        ) {
            return
        }
        const arr = new Array(cols * rows)
        // Simple hashed pseudo-random for determinism per cell.
        for (let i = 0; i < arr.length; i++) {
            const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453
            const r1 = s - Math.floor(s)
            const s2 = Math.sin(i * 7.137 + 33.71) * 12345.6789
            const r2 = s2 - Math.floor(s2)
            const s3 = Math.sin(i * 3.51 + 5.91) * 9876.54321
            const r3 = s3 - Math.floor(s3)
            arr[i] = {
                phase: r1 * Math.PI * 2,
                // 0.6x..1.4x the base rate so cells drift apart over time
                rate: 0.6 + r2 * 0.8,
                tint: r3, // used for secondary color mixing
            }
        }
        cellsRef.current = arr
        cellsKeyRef.current = key
    }

    function parseColor(c: string): [number, number, number] {
        // Accept #rgb, #rrggbb, rgb(), rgba()
        if (!c) return [255, 255, 255]
        const s = c.trim()
        if (s.startsWith("#")) {
            const hex = s.slice(1)
            if (hex.length === 3) {
                return [
                    parseInt(hex[0] + hex[0], 16),
                    parseInt(hex[1] + hex[1], 16),
                    parseInt(hex[2] + hex[2], 16),
                ]
            }
            if (hex.length === 6 || hex.length === 8) {
                return [
                    parseInt(hex.slice(0, 2), 16),
                    parseInt(hex.slice(2, 4), 16),
                    parseInt(hex.slice(4, 6), 16),
                ]
            }
        }
        const m = s.match(/rgba?\(([^)]+)\)/i)
        if (m) {
            const parts = m[1].split(",").map((v) => parseFloat(v.trim()))
            return [parts[0] || 0, parts[1] || 0, parts[2] || 0]
        }
        return [255, 255, 255]
    }

    function draw(now: number) {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const { w, h } = sizeRef.current
        if (w <= 0 || h <= 0) return

        // Layout: square cells across the shorter dimension determines cell size,
        // then fill the area with cols/rows derived from gridSize on the long axis.
        const cells = Math.max(2, Math.floor(gridSize))
        const longSide = Math.max(w, h)
        const cellSize = longSide / cells
        const cols = Math.max(1, Math.ceil(w / cellSize))
        const rows = Math.max(1, Math.ceil(h / cellSize))
        ensureCells(cols, rows)

        // Transparent canvas — no background fill.
        ctx.clearRect(0, 0, w, h)

        // Palette: one color in "single" mode, up to 5 in "multiple".
        const palette: Array<[number, number, number]> =
            colorMode === "multiple" &&
                Array.isArray(colors) &&
                colors.length > 0
                ? colors.slice(0, 5).map((c: string) => parseColor(c))
                : [parseColor(squareColor)]

        const t = (now - startRef.current) / 1000
        // Speed control is 1–100; scale to ~0.05–5 cycles/sec.
        const speed = Math.max(0, twinkleSpeed) * 0.05
        const strength = 1 // full blink
        const masterOpacity = Math.max(0, Math.min(1, opacity))
        // fillPercent is 10–100 (%); convert to 0.1–1.0 square-size fraction.
        const fill = Math.max(0.1, Math.min(1, (fillPercent ?? 70) / 100))
        const inset = (1 - fill) * 0.5

        // Fade covers the far `fadePercent`% of the canvas: 0 = no fade,
        // 100 = gradient across the whole canvas. The faded band is [1-f, 1]
        // along the fade axis (full before it, empty at the far edge).
        const f = Math.max(0, Math.min(1, (fadePercent ?? 0) / 100))
        const fStart = 1 - f
        const fEnd = 1
        const noFade = f <= 0
        // Intensity 0–100% maps to the fade curve exponent (0.2 = gentle,
        // 6 = steep). Higher % = sharper fade.
        const falloff =
            0.2 + (Math.max(0, Math.min(100, fadeIntensity ?? 25)) / 100) * 5.8

        const cursor = pointerRef.current
        const hasCursor = hasCursorInteraction && cursor.active
        const cr = Math.max(1, cursorRadius)
        // Halo Boost control is 1–100; scale to a 0.01–1.0 brightness add.
        const cb = Math.max(0, cursorBoost) / 100
        const cr2 = cr * cr

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const i = y * cols + x
                const cell = cellsRef.current[i]
                if (!cell) continue

                // Directional fade ramp: u goes 0->1 along chosen axis
                let u: number
                switch (fadeDirection) {
                    case "left":
                        u = 1 - x / Math.max(1, cols - 1)
                        break
                    case "top":
                        u = 1 - y / Math.max(1, rows - 1)
                        break
                    case "bottom":
                        u = y / Math.max(1, rows - 1)
                        break
                    case "none":
                        u = 0
                        break
                    case "right":
                    default:
                        u = x / Math.max(1, cols - 1)
                }
                // Density envelope: 1 below fStart, 0 above fEnd, smooth between
                let envelope: number
                if (fadeDirection === "none" || noFade) {
                    envelope = 1
                } else if (u <= fStart) {
                    envelope = 1
                } else if (u >= fEnd) {
                    envelope = 0
                } else {
                    const k = (u - fStart) / Math.max(0.0001, fEnd - fStart)
                    envelope = Math.pow(1 - k, falloff)
                }
                // Cell origin + center (center needed for cursor distance).
                const cx = x * cellSize
                const cy = y * cellSize

                // Cursor halo: how strongly this cell is revealed (0..cb).
                // Computed BEFORE any fade culling so hovering reaches squares
                // the fade has emptied.
                let reveal = 0
                if (hasCursor) {
                    const dx = cx + cellSize * 0.5 - cursor.x
                    const dy = cy + cellSize * 0.5 - cursor.y
                    const d2 = dx * dx + dy * dy
                    if (d2 < cr2) {
                        const k = 1 - d2 / cr2
                        reveal = k * k * cb
                    }
                }

                // Twinkle: each cell oscillates around (1 - strength/2) .. 1
                const osc =
                    0.5 +
                    0.5 *
                    Math.sin(
                        t * speed * cell.rate * Math.PI * 2 + cell.phase
                    )
                const twinkle = 1 - strength + strength * osc

                // The cursor LIFTS the density envelope (instead of adding a
                // flat amount), so revealed squares blink like all the rest.
                const env2 = Math.min(1, envelope + reveal)
                const finalAlpha = env2 * twinkle * masterOpacity
                if (finalAlpha <= 0.002) continue

                const sx = cx + cellSize * inset
                const sy = cy + cellSize * inset
                const sw = cellSize * fill
                const sh = cellSize * fill

                // Color: in "multiple" mode each cell picks one palette entry
                // (stable via its per-cell tint); "single" uses the one color.
                const ci =
                    palette.length > 1
                        ? Math.min(
                            palette.length - 1,
                            Math.floor(cell.tint * palette.length)
                        )
                        : 0
                const [r, g, b] = palette[ci]

                ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${finalAlpha.toFixed(
                    3
                )})`
                ctx.fillRect(sx, sy, sw, sh)
            }
        }
    }

    function loop(now: number) {
        draw(now)
        rafRef.current = requestAnimationFrame(loop)
    }

    // Setup: resize observer + DPR-aware canvas + RAF
    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const resize = (entry?: ResizeObserverEntry) => {
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
            // Prefer the observer's contentRect, then layout box, then
            // getBoundingClientRect (which can read 0 on the Framer canvas at
            // setup) so the grid fills the whole frame instead of collapsing.
            const cr = entry?.contentRect
            const rectW =
                cr?.width ||
                container.clientWidth ||
                container.getBoundingClientRect().width
            const rectH =
                cr?.height ||
                container.clientHeight ||
                container.getBoundingClientRect().height
            const w = Math.max(1, Math.floor(rectW) || 1)
            const h = Math.max(1, Math.floor(rectH) || 1)
            canvas.width = Math.floor(w * dpr)
            canvas.height = Math.floor(h * dpr)
            canvas.style.width = w + "px"
            canvas.style.height = h + "px"
            const ctx = canvas.getContext("2d")
            if (ctx) {
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            }
            sizeRef.current = { w, h }
            // Invalidate cell grid (cols/rows depend on size); ensureCells will refill
            cellsKeyRef.current = ""
        }

        resize()
        const ro = new ResizeObserver((entries) => resize(entries[0]))
        ro.observe(container)

        if (isStaticRenderer) {
            // Single frame for canvas/export
            draw(performance.now())
        } else {
            startRef.current = performance.now()
            rafRef.current = requestAnimationFrame(loop)
        }

        return () => {
            ro.disconnect()
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStaticRenderer])

    // Pointer tracking (only when interaction is on, avoids unnecessary listeners)
    useEffect(() => {
        const el = containerRef.current
        if (!el || !hasCursorInteraction) return

        const onMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect()
            pointerRef.current.x = e.clientX - rect.left
            pointerRef.current.y = e.clientY - rect.top
            pointerRef.current.active = true
        }
        const onLeave = () => {
            pointerRef.current.active = false
            pointerRef.current.x = -9999
            pointerRef.current.y = -9999
        }
        el.addEventListener("pointermove", onMove)
        el.addEventListener("pointerleave", onLeave)
        return () => {
            el.removeEventListener("pointermove", onMove)
            el.removeEventListener("pointerleave", onLeave)
        }
    }, [hasCursorInteraction])

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "33.33vh",
                overflow: "hidden",
                backgroundColor: "#FAF8F5", // Premium warm off-white background
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    pointerEvents: "none",
                }}
            />

            {/* Logo and Text Center Area */}
            <div style={{ position: "relative", zIndex: 10, height: "50%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 3038 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: "100%", width: "auto", maxWidth: "90vw" }}>
                    <path d="M204 304.892L273.919 174L474.218 543.79L534.755 433.761L674 174H554.278L474.775 320.013L532.834 426.514L601.66 557.952L540.237 673H401.613L204 304.892Z" fill="url(#paint0_linear_438_9992)" />
                    <path d="M696.5 600V534.5L739.5 532V314L696.5 311.5V246L781.5 250L866.5 246V311.5L823.5 314V532L866.5 534.5V600L781.5 596L696.5 600ZM912.844 598V248H1158.84V318H996.844V386H1133.84V453H996.844V528H1163.84V598H912.844ZM1279.88 598V321H1188.88V248H1454.88V321H1363.88V598H1279.88ZM1492.52 598V525H1678.52V459.5L1487.52 443V306L1545.52 248H1757.52V321H1571.52V381.5L1762.52 398V540L1704.52 598H1492.52ZM1885.84 598V321H1794.84V248H2060.84V321H1969.84V598H1885.84ZM2178.97 432H2293.97V315H2178.97V432ZM2377.97 309V435.5L2337.47 476L2397.97 598H2303.97L2259.47 499H2178.97V598H2094.97V248H2316.97L2377.97 309ZM2421.6 600V534.5L2464.6 532V314L2421.6 311.5V246L2506.6 250L2591.6 246V311.5L2548.6 314V532L2591.6 534.5V600L2506.6 596L2421.6 600ZM2617.94 598L2695.94 413L2625.44 248H2715.44L2764.44 380H2793.44L2842.44 248H2932.44L2861.94 413L2939.94 598H2848.94L2796.94 456H2760.94L2708.94 598H2617.94Z" fill="#063265" />
                    <defs>
                        <linearGradient id="paint0_linear_438_9992" x1="202.184" y1="447.8" x2="674.517" y2="401.992" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#02A5FF" />
                            <stop offset="1" stop-color="#00468D" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}

const COMPONENT_DEFAULTS = {
    gridSize: 30,
    fillPercent: 60,
    colorMode: "multiple",
    squareColor: "#063265",
    colors: ["#02A5FF", "#00468D", "#063265", "#E8F4FD"],
    twinkleSpeed: 15,
    opacity: 0.12,
    fadeDirection: "none",
    fadePercent: 0,
    fadeIntensity: 25,
    hasCursorInteraction: true,
    cursorRadius: 180,
    cursorBoost: 80,
}

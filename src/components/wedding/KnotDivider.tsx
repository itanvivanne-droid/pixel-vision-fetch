import { useEffect, useRef, useState } from "react";

/**
 * Pure-SVG wedding knot divider.
 * Two silken cloths slide in from the extreme left/right of the viewport,
 * meet in the middle, and a gold knot ties them together.
 */
export function KnotDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tied, setTied] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTied(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`knot-divider ${tied ? "is-tied" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        className="knot-svg"
        viewBox="0 0 1000 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ribbonLeft" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="oklch(0.40 0.20 22)" />
            <stop offset="55%"  stopColor="oklch(0.55 0.25 18)" />
            <stop offset="100%" stopColor="oklch(0.42 0.22 22)" />
          </linearGradient>
          <linearGradient id="ribbonRight" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="oklch(0.75 0.18 78)" />
            <stop offset="55%"  stopColor="oklch(0.92 0.10 88)" />
            <stop offset="100%" stopColor="oklch(0.78 0.16 82)" />
          </linearGradient>
          <radialGradient id="knotCenter" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="oklch(0.95 0.16 88)" />
            <stop offset="55%"  stopColor="oklch(0.78 0.18 78)" />
            <stop offset="100%" stopColor="oklch(0.42 0.20 25)" />
          </radialGradient>
          <radialGradient id="sparkle" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="oklch(0.98 0.12 88 / 0.95)" />
            <stop offset="60%"  stopColor="oklch(0.85 0.18 80 / 0.4)" />
            <stop offset="100%" stopColor="oklch(0.85 0.18 80 / 0)" />
          </radialGradient>
        </defs>

        {/* LEFT cloth — slides in from off-screen left */}
        <g className="cloth cloth-l">
          <path
            d="M -50 60 Q 200 20, 500 80"
            stroke="url(#ribbonLeft)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          {/* gold trim line along the cloth */}
          <path
            d="M -50 60 Q 200 20, 498 78"
            stroke="oklch(0.88 0.14 88 / 0.7)"
            strokeWidth="2"
            strokeDasharray="4 6"
            fill="none"
          />
        </g>

        {/* RIGHT cloth — slides in from off-screen right */}
        <g className="cloth cloth-r">
          <path
            d="M 1050 60 Q 800 20, 500 80"
            stroke="url(#ribbonRight)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 1050 60 Q 800 20, 502 78"
            stroke="oklch(0.55 0.20 25 / 0.5)"
            strokeWidth="2"
            strokeDasharray="3 5"
            fill="none"
          />
        </g>

        {/* Tassels dropping from the knot once tied */}
        <g className="tassels">
          <path
            d="M 500 82 Q 478 110, 470 145"
            stroke="url(#ribbonLeft)"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 500 82 Q 522 110, 530 145"
            stroke="url(#ribbonRight)"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Central knot — pops as the cloths meet */}
        <g className="knot-core">
          <ellipse
            cx="500" cy="80" rx="26" ry="18"
            fill="url(#knotCenter)"
            stroke="oklch(0.55 0.20 30)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="500" cy="80" rx="10" ry="6"
            fill="oklch(0.96 0.14 88)"
            opacity="0.85"
          />
        </g>

        {/* Sparkle burst at the moment of tying */}
        <circle className="knot-burst" cx="500" cy="80" r="40" fill="url(#sparkle)" />
      </svg>
    </div>
  );
}

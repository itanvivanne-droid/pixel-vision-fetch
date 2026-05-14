import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-20T15:45:00+05:30").getTime();

function diff() {
  const now = Date.now();
  const d = Math.max(0, TARGET - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="relative max-w-3xl mx-auto px-2">
      {/* soft gold glow halo */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-40 rounded-full"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.85 0.18 80 / 0.6), transparent 70%)" }}
      />
      <div className="grid grid-cols-4 gap-3 md:gap-8">
        {items.map((it, i) => (
          <div key={it.label} className="flex flex-col items-center group">
            {/* medallion */}
            <div
              className="relative w-full aspect-square max-w-[140px] flex items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, oklch(0.45 0.16 22) 0%, oklch(0.32 0.14 22) 55%, oklch(0.22 0.1 22) 100%)",
                boxShadow:
                  "inset 0 0 0 1px oklch(0.88 0.14 88 / 0.55), inset 0 0 24px oklch(0.22 0.1 22 / 0.6), 0 18px 40px -18px oklch(0.32 0.14 22 / 0.7), 0 0 30px -8px oklch(0.85 0.18 80 / 0.4)",
              }}
            >
              {/* outer dotted gold ring */}
              <div
                className="absolute inset-1.5 rounded-full pointer-events-none animate-spin-slower"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0 6deg, oklch(0.85 0.18 80 / 0.7) 6deg 8deg, transparent 8deg 18deg)",
                  WebkitMask: "radial-gradient(circle, transparent 60%, #000 61%, #000 64%, transparent 65%)",
                  mask: "radial-gradient(circle, transparent 60%, #000 61%, #000 64%, transparent 65%)",
                }}
              />
              {/* inner thin gold circle */}
              <div
                className="absolute inset-3 rounded-full pointer-events-none"
                style={{ border: "1px solid oklch(0.85 0.18 80 / 0.4)" }}
              />
              <div
                className="font-display text-3xl md:text-5xl text-gold-shimmer leading-none"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {String(it.value).padStart(2, "0")}
              </div>
            </div>
            <div
              className="mt-3 font-display text-[9px] md:text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "oklch(0.55 0.18 22)" }}
            >
              {it.label}
            </div>
          </div>
        ))}
      </div>
      {/* delicate ornamental line */}
      <div className="ornament-divider mt-8">
        <span className="font-script text-2xl" style={{ color: "var(--maroon)" }}>शुभ विवाह</span>
      </div>
    </div>
  );
}

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
    <div className="relative max-w-4xl mx-auto px-4">
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-30 rounded-full"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.85 0.18 80 / 0.5), transparent 70%)" }}
      />
      <div className="flex items-stretch justify-center gap-2 md:gap-6">
        {items.map((it, i) => (
          <div key={it.label} className="flex items-center">
            <div className="flex flex-col items-center group">
              {/* ivory tile with gold engraved border */}
              <div
                className="relative w-[68px] h-[88px] md:w-[120px] md:h-[150px] flex items-center justify-center rounded-[14px] md:rounded-[20px] transition-transform duration-500 group-hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.985 0.012 88) 0%, oklch(0.96 0.025 82) 100%)",
                  boxShadow:
                    "0 1px 0 oklch(1 0 0 / 0.8) inset, 0 -1px 0 oklch(0.32 0.14 22 / 0.08) inset, 0 14px 30px -18px oklch(0.32 0.14 22 / 0.45)",
                }}
              >
                {/* double gold border */}
                <div className="absolute inset-[3px] md:inset-[5px] rounded-[10px] md:rounded-[15px] pointer-events-none"
                  style={{ border: "1px solid oklch(0.78 0.16 82 / 0.65)" }} />
                <div className="absolute inset-[7px] md:inset-[10px] rounded-[8px] md:rounded-[12px] pointer-events-none"
                  style={{ border: "1px solid oklch(0.78 0.16 82 / 0.3)" }} />
                {/* tiny ornaments at corners */}
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px]" style={{ color: "oklch(0.7 0.16 82)" }}>✦</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px]" style={{ color: "oklch(0.7 0.16 82)" }}>✦</span>

                <div
                  className="font-script text-4xl md:text-6xl leading-none tabular-nums"
                  style={{ color: "var(--maroon)", textShadow: "0 1px 0 oklch(1 0 0 / 0.6)" }}
                >
                  {String(it.value).padStart(2, "0")}
                </div>
              </div>
              <div
                className="mt-3 font-display text-[8px] md:text-[10px] tracking-[0.5em] uppercase"
                style={{ color: "var(--maroon)" }}
              >
                {it.label}
              </div>
            </div>
            {i < items.length - 1 && (
              <span className="mx-1 md:mx-3 font-display text-2xl md:text-4xl pb-6 self-center" style={{ color: "oklch(0.78 0.16 82)" }}>:</span>
            )}
          </div>
        ))}
      </div>
      <div className="ornament-divider mt-10">
        <span className="font-script text-2xl" style={{ color: "var(--maroon)" }}>शुभ विवाह</span>
      </div>
    </div>
  );
}

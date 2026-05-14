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
    <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-xl gold-border p-3 md:p-5 text-center"
          style={{ background: "linear-gradient(160deg, oklch(0.32 0.14 22), oklch(0.22 0.1 22))" }}
        >
          <div className="font-display text-2xl md:text-5xl text-gold-shimmer leading-none">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold-shimmer/80" style={{ color: "oklch(0.85 0.12 80)" }}>
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}

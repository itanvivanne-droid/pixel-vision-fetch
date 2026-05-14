import { useState } from "react";

interface Props { children: React.ReactNode; label?: string; }

export function Curtain({ children, label = "Open the curtains" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl gold-border" style={{ minHeight: 480 }}>
      <div className="relative">{children}</div>

      {/* curtains */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 z-20 transition-transform duration-[1800ms] ease-in-out"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.28 0.16 18) 0%, oklch(0.42 0.18 12) 50%, oklch(0.28 0.16 18) 100%)",
          backgroundImage:
            "repeating-linear-gradient(90deg, oklch(0.28 0.16 18) 0px, oklch(0.42 0.18 12) 22px, oklch(0.28 0.16 18) 44px)",
          transform: open ? "translateX(-105%)" : "translateX(0)",
          boxShadow: "inset -20px 0 40px oklch(0.15 0.08 18 / 0.6)",
        }}
      >
        <div className="absolute top-0 inset-x-0 h-12" style={{ background: "linear-gradient(180deg, oklch(0.75 0.16 80), transparent)" }} />
      </div>
      <div
        className="absolute inset-y-0 right-0 w-1/2 z-20 transition-transform duration-[1800ms] ease-in-out"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, oklch(0.28 0.16 18) 0px, oklch(0.42 0.18 12) 22px, oklch(0.28 0.16 18) 44px)",
          transform: open ? "translateX(105%)" : "translateX(0)",
          boxShadow: "inset 20px 0 40px oklch(0.15 0.08 18 / 0.6)",
        }}
      >
        <div className="absolute top-0 inset-x-0 h-12" style={{ background: "linear-gradient(180deg, oklch(0.75 0.16 80), transparent)" }} />
      </div>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-8 py-3 rounded-full font-display text-sm tracking-[0.3em] uppercase animate-pulse-glow"
          style={{
            background: "var(--gradient-gold)",
            color: "oklch(0.25 0.12 22)",
            border: "1px solid oklch(0.95 0.05 88)",
          }}
        >
          {label}
        </button>
      )}
    </div>
  );
}

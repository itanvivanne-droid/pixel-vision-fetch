import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EnvelopeOpening } from "@/components/wedding/EnvelopeOpening";
import { ScratchReveal } from "@/components/wedding/ScratchReveal";

import { Countdown } from "@/components/wedding/Countdown";
import { FlowerShower } from "@/components/wedding/FlowerShower";
import { ScrollReveal } from "@/components/wedding/ScrollReveal";
import { AmbientDrift } from "@/components/wedding/AmbientDrift";
import { KnotDivider } from "@/components/wedding/KnotDivider";
import mandalaBg from "@/assets/mandala-bg.jpg";
import tropicalCorner from "@/assets/tropical-corner.png";
import palmLeaf from "@/assets/palm-leaf.png";
import mdMonogram from "@/assets/md-monogram.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mansi & Darshan — A Royal Wedding" },
      { name: "description", content: "Join us in celebrating the royal wedding of Mansi & Darshan, 19–20 June 2026, Mumbai." },
      { property: "og:title", content: "Mansi weds Darshan" },
      { property: "og:description", content: "A three-day royal celebration. 19–20 June 2026, Mumbai." },
    ],
  }),
  component: Index,
});

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament-divider my-6 ${className}`}>
      <span className="text-gold-shimmer text-xl">✦</span>
    </div>
  );
}

function SectionTitle({ kicker, title, script }: { kicker?: string; title: string; script?: string }) {
  return (
    <div className="text-center mb-10">
      {kicker && (
        <p className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "var(--magenta)" }}>
          {kicker}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-5xl text-gold-shimmer">{title}</h2>
      {script && <p className="font-script text-3xl md:text-4xl mt-2" style={{ color: "var(--maroon)" }}>{script}</p>}
      <Ornament />
    </div>
  );
}

// (Old SabyaDivider replaced by KnotDivider — see component.)

function FunctionFlow({
  date, day, name, theme, themeDesc, venue, address, time, image, reverse = false,
}: {
  date: string; day: string; name: string; theme: string; themeDesc: string; venue: string; address: string; time: string; image: string; reverse?: boolean;
}) {
  return (
    <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto px-6 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
      <div className="relative flex flex-col items-center text-center">
        <div className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-30"
             style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 65%)" }} />
        <img src={image} alt={name} className="w-56 h-56 md:w-72 md:h-72 object-contain animate-gentle-float drop-shadow-[0_20px_40px_oklch(0.32_0.14_22/0.35)]" loading="lazy" />
      </div>
      <div className="flex flex-col text-center md:text-left">
        <div className="font-display text-[10px] md:text-xs tracking-[0.5em] uppercase" style={{ color: "var(--magenta)" }}>{day}</div>
        <div className="font-display text-xs tracking-[0.4em] uppercase mt-1" style={{ color: "var(--maroon)" }}>{date}</div>
        <h3 className="mt-3 font-script text-6xl md:text-7xl leading-none" style={{ color: "var(--maroon)" }}>{name}</h3>
        <div className="ornament-divider my-5 max-w-[180px] md:mx-0 mx-auto"><span style={{ color: "var(--gold)" }}>✦</span></div>
        <h4 className="font-display text-xl md:text-2xl text-gold-shimmer">{theme}</h4>
        <p className="font-serif italic text-lg md:text-xl mt-2 mb-5" style={{ color: "var(--maroon)" }}>{themeDesc}</p>
        <div className="space-y-1 text-sm md:text-base">
          <p className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Venue</p>
          <p className="font-serif text-lg" style={{ color: "var(--foreground)" }}>{venue}</p>
          <p className="font-serif" style={{ color: "var(--muted-foreground)" }}>{address}</p>
          <p className="mt-3 font-serif font-semibold" style={{ color: "var(--maroon)" }}>{time}</p>
        </div>
      </div>
    </div>
  );
}

function SabyaFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <img src={tropicalCorner} alt="" className="absolute -top-8 -left-8 w-32 md:w-52 pointer-events-none select-none animate-gentle-float" loading="lazy" />
      <img src={tropicalCorner} alt="" className="absolute -bottom-8 -right-8 w-32 md:w-52 pointer-events-none select-none animate-gentle-float" style={{ transform: "scale(-1,-1)", animationDelay: "1.5s" }} loading="lazy" />
      {children}
    </div>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [shower, setShower] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setShower(true);
    setTimeout(() => setShower(false), 6000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--ivory)" }}>
      {!opened && <EnvelopeOpening onOpen={handleOpen} />}
      {shower && <FlowerShower count={30} />}

      {/* faint mandala background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06] z-0"
        style={{ backgroundImage: `url(${mandalaBg})`, backgroundSize: "600px", backgroundRepeat: "repeat" }}
      />

      {/* ambient floating petals & paisleys */}
      {opened && <AmbientDrift density={16} />}

{/* Side frame removed — knot dividers now flow between sections */}

      <main className={`relative z-10 transition-opacity duration-1000 ${opened ? "opacity-100" : "opacity-0"}`}>
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
          <img src={palmLeaf} alt="" className="absolute -top-4 -left-6 w-32 md:w-48 opacity-80 animate-sway origin-top-left" loading="lazy" />
          <img src={palmLeaf} alt="" className="absolute -top-4 -right-6 w-32 md:w-48 opacity-80 animate-sway origin-top-right scale-x-[-1]" loading="lazy" />
          <img src={tropicalCorner} alt="" className="absolute -bottom-6 -left-6 w-40 md:w-64 opacity-90 animate-gentle-float" loading="lazy" />
          <img src={tropicalCorner} alt="" className="absolute -bottom-6 -right-6 w-40 md:w-64 opacity-90 animate-gentle-float scale-x-[-1]" style={{ animationDelay: "1s" }} loading="lazy" />

          <p className="font-serif italic tracking-widest text-sm" style={{ color: "var(--magenta)" }}>
            ॥ Shree Ganeshay Namah ॥ ॥ Shree Mahaviray Namah ॥
          </p>

          {/* MD Monogram */}
          <div className="relative mt-6 mb-2 flex items-center justify-center">
            <span className="hidden md:block h-px w-24 lg:w-32" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <div className="relative mx-4">
              <div className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-50"
                   style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
              <img
                src={mdMonogram}
                alt="Mansi & Darshan monogram"
                className="w-40 md:w-56 lg:w-64 mx-auto animate-gentle-float drop-shadow-[0_10px_30px_oklch(0.32_0.14_22/0.25)]"
                style={{ mixBlendMode: "multiply" }}
                loading="eager"
              />
            </div>
            <span className="hidden md:block h-px w-24 lg:w-32" style={{ background: "linear-gradient(270deg, transparent, var(--gold))" }} />
          </div>
          <Ornament />

          <p className="font-display text-xs md:text-sm tracking-[0.5em] uppercase" style={{ color: "var(--maroon)" }}>
            With the blessings of our families
          </p>

          <ScrollReveal variant="scale" delay={100}>
            <h1 className="mt-6 font-script text-7xl md:text-[10rem] leading-none animate-glow-pulse" style={{ color: "var(--maroon)" }}>
              Mansi
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade" delay={250}>
            <div className="my-2 flex items-center gap-4 justify-center">
              <span className="block w-16 h-px animate-shimmer-line origin-right" style={{ background: "var(--gold)" }} />
              <span className="font-display text-2xl md:text-4xl text-gold-shimmer">&</span>
              <span className="block w-16 h-px animate-shimmer-line origin-left" style={{ background: "var(--gold)" }} />
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={400}>
            <h1 className="font-script text-7xl md:text-[10rem] leading-none animate-glow-pulse" style={{ color: "var(--maroon)" }}>
              Darshan
            </h1>
          </ScrollReveal>

          <Ornament />

          {/* Scratch reveal */}
          <div className="mt-12 w-full max-w-md">
            <p className="mb-4 text-sm tracking-[0.3em] uppercase font-display" style={{ color: "var(--magenta)" }}>
              Scratch to reveal the date
            </p>
            <ScratchReveal onRevealed={() => setRevealed(true)}>
              <div>
                <p className="font-display text-xs tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Save the date</p>
                <p className="font-script text-5xl md:text-6xl mt-2" style={{ color: "var(--maroon)" }}>20th June</p>
                <p className="font-display text-sm tracking-[0.3em] mt-1" style={{ color: "var(--maroon)" }}>2026 · MUMBAI</p>
              </div>
            </ScratchReveal>
            {revealed && (
              <p className="mt-4 font-serif italic animate-fade-up" style={{ color: "var(--maroon)" }}>
                Mark your hearts. Save your day.
              </p>
            )}
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="relative px-6 py-20">
          <ScrollReveal>
            <SectionTitle kicker="The Wait Begins" title="Counting Down" script="till we say I do" />
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={150}>
            <Countdown />
          </ScrollReveal>
        </section>

        {/* FAMILIES */}
        <section className="relative px-6 py-24">
          {/* tropical ambient backdrop — leaves anchored to viewport edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 -z-10 overflow-hidden">
            <div className="absolute inset-x-0 top-10 h-72 opacity-60"
                 style={{ background: "radial-gradient(ellipse at center, oklch(0.92 0.08 140 / 0.35), transparent 65%)" }} />
            <div className="absolute inset-x-0 bottom-10 h-72 opacity-60"
                 style={{ background: "radial-gradient(ellipse at center, oklch(0.85 0.12 30 / 0.3), transparent 65%)" }} />
            <img src={palmLeaf} alt="" className="edge-leaf left" style={{ top: "8%" }} loading="lazy" />
            <img src={palmLeaf} alt="" className="edge-leaf right" style={{ top: "12%", animationDelay: "0.6s" }} loading="lazy" />
            <img src={palmLeaf} alt="" className="edge-leaf left" style={{ top: "55%", width: 220, animationDelay: "1.2s", opacity: 0.4 }} loading="lazy" />
            <img src={palmLeaf} alt="" className="edge-leaf right" style={{ top: "62%", width: 220, animationDelay: "0.4s", opacity: 0.4 }} loading="lazy" />
          </div>

          <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionTitle kicker="With pride & joy" title="Our Families" script="who made us who we are" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {/* Bride family */}
            <ScrollReveal variant="left" delay={100}>
            <SabyaFrame>
              <div className="relative rounded-[2rem] family-card animate-card-breathe p-10 md:p-14 text-center">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 mb-3">
                    <span className="h-px w-8" style={{ background: "var(--gold)" }} />
                    <span className="text-2xl animate-lotus-bloom" style={{ color: "var(--magenta)" }}>❀</span>
                    <span className="h-px w-8" style={{ background: "var(--gold)" }} />
                  </div>
                  
                  <h3 className="mt-4 font-script text-6xl md:text-7xl text-maroon-shimmer leading-tight">Dr. Mansi</h3>
                  <p className="font-display text-[10px] tracking-[0.5em] uppercase mt-2" style={{ color: "var(--maroon)" }}>The Bride</p>
                  <Ornament />
                  <div className="space-y-5 text-base">
                    <ScrollReveal variant="up" delay={300}>
                      <p>
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Daughter of</span><br />
                        <span className="font-serif text-xl mt-1 inline-block" style={{ color: "var(--maroon)" }}>Dr. Heena Bhatt &amp; Dr. Milind Bhatt</span>
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="up" delay={450}>
                      <p>
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Granddaughter of</span><br />
                        <span className="font-serif italic text-base" style={{ color: "var(--foreground)" }}>Late Dr. Rasiklal Himmatlal Bhatt</span><br />
                        <span className="font-serif italic text-base" style={{ color: "var(--foreground)" }}>Late Smt. Hasmanben Bhatt</span>
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </SabyaFrame>
            </ScrollReveal>

            {/* Groom family */}
            <ScrollReveal variant="right" delay={250}>
            <SabyaFrame>
              <div className="relative rounded-[2rem] family-card animate-card-breathe p-10 md:p-14 text-center" style={{ animationDelay: "1.5s" }}>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 mb-3">
                    <span className="h-px w-8" style={{ background: "var(--gold)" }} />
                    <span className="text-2xl animate-lotus-bloom" style={{ color: "var(--magenta)", animationDelay: "0.3s" }}>❀</span>
                    <span className="h-px w-8" style={{ background: "var(--gold)" }} />
                  </div>
                  
                  <h3 className="mt-4 font-script text-6xl md:text-7xl text-maroon-shimmer leading-tight">Darshan Doshi</h3>
                  <p className="font-display text-[10px] tracking-[0.5em] uppercase mt-2" style={{ color: "var(--maroon)" }}>The Groom</p>
                  <Ornament />
                  <div className="space-y-5 text-base">
                    <ScrollReveal variant="up" delay={300}>
                      <p>
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Son of</span><br />
                        <span className="font-serif text-xl mt-1 inline-block" style={{ color: "var(--maroon)" }}>Bina Doshi &amp; Rajesh Doshi</span>
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="up" delay={450}>
                      <p>
                        <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--magenta)" }}>Grandson of</span><br />
                        <span className="font-serif italic text-base" style={{ color: "var(--foreground)" }}>Late Shri Chhaganlal Doshi</span><br />
                        <span className="font-serif italic text-base" style={{ color: "var(--foreground)" }}>Late Smt. Manchaben Doshi</span>
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </SabyaFrame>
            </ScrollReveal>
          </div>

          {/* Third card — Awaiting your presence */}
          <ScrollReveal variant="up" delay={200}>
            <div className="mt-8 md:mt-12 max-w-md mx-auto">
              <SabyaFrame>
                <div className="relative rounded-[1.5rem] family-card animate-card-breathe p-6 md:p-8 text-center" style={{ animationDelay: "0.8s" }}>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="h-px w-6" style={{ background: "var(--gold)" }} />
                      <span className="text-lg animate-lotus-bloom" style={{ color: "var(--magenta)", animationDelay: "0.6s" }}>❀</span>
                      <span className="h-px w-6" style={{ background: "var(--gold)" }} />
                    </div>
                    <h3 className="font-script text-2xl md:text-3xl text-maroon-shimmer leading-tight">Awaiting your presence</h3>
                    <div className="ornament-divider my-3"><span style={{ color: "var(--gold)" }}>✦</span></div>
                    <ScrollReveal variant="up" delay={250}>
                      <p className="text-sm">
                        <span className="font-serif text-base inline-block" style={{ color: "var(--maroon)" }}>Dr. Drishti · Dr. Yash</span><br />
                        <span className="font-serif text-base" style={{ color: "var(--maroon)" }}>Kruti · Kunur · Malay · Jinal · Hardik</span>
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              </SabyaFrame>
            </div>
          </ScrollReveal>
          </div>
        </section>


        {/* Knot divider closing the page */}
        <section className="relative py-16">
          <ScrollReveal variant="fade"><KnotDivider /></ScrollReveal>
        </section>
      </main>
    </div>
  );
}

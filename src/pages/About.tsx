import { useEffect, useRef, useState, type ReactNode } from "react";
import CompanyOverview from "src/components/CompanyOverview";
import CoreExpertise from "src/components/CoreExpertise";
import TechEcosystem from "src/components/TechEcosystem";
import IndustriesSection from "src/components/IndustriesSection";
import VisionMission from "src/components/VisionMission";
import CTASection from "src/components/CTASection";
import { Link } from "react-router-dom";

// ─── Shared Primitives ────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
      style={{
        color: "#FF7F00",
        borderColor: light ? "rgba(255,127,0,0.4)" : "rgba(255,127,0,0.3)",
        backgroundColor: light
          ? "rgba(255,127,0,0.12)"
          : "rgba(255,127,0,0.08)",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "#FF7F00" }}
      />
      {children}
    </span>
  );
}

// ───  Hero ──────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section
      className="relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 pb-0 pt-24"
      style={{ backgroundColor: "#081D3A" }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className=""
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 w-[600px] h-[500px] opacity-[0.14]"
        style={{
          background:
            "radial-gradient(ellipse at top right, #FF7F00, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center pb-0">
          {/* Left */}
          <div className="py-8 lg:py-16">
            <Reveal>
              <Eyebrow light>About SK Solution</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 mb-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] tracking-tight text-white">
                We build software
                <br />
                <span style={{ color: "#FF7F00" }}>industries run on.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p
                className="mb-8 text-base sm:text-lg leading-relaxed max-w-md"
                style={{ color: "rgba(255,255,255,0.52)" }}
              >
                Founded in 2012, SK Solution has grown from a
                four-person startup in Nagpur into a 120-engineer company
                trusted by enterprises across 12 countries. We build the
                software layer that connects factory floors to boardrooms — IoT,
                ERP, AI, and the infrastructure they run on.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#about"
                  className="rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(255,127,0,0.38)] active:scale-95"
                  style={{ background: "#FF7F00" }}
                >
                  Our Story
                </a>
                <Link
                  to="/contact"
                  className="rounded-xl border px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:bg-white/10 active:scale-95"
                  style={{
                    borderColor: "rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  Contact Us →
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right — stats cluster */}
          <Reveal
            delay={100}
            className="relative hidden lg:flex items-center justify-center py-16"
          >
            {/* Central card */}
            <div
              className="relative z-10 rounded-3xl p-8 w-72"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Mini logo */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FF7F00" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10L10 4L16 10L10 16Z"
                      stroke="#fff"
                      strokeWidth="1.8"
                      fill="none"
                    />
                    <circle cx="10" cy="10" r="2.5" fill="#fff" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-black">SK Solution</div>
                  <div className="text-[11px]" style={{ color: "#FF7F00" }}>
                    Technologies
                  </div>
                </div>
              </div>
              <div
                className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                At a glance
              </div>
              {[
                { label: "Team members", value: "120+" },
                { label: "Enterprise clients", value: "50+" },
                { label: "Countries reached", value: "12" },
                { label: "Projects delivered", value: "300+" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between py-2.5"
                  style={{
                    borderBottom:
                      i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="text-sm font-black"
                    style={{ color: i % 2 === 0 ? "#FF7F00" : "#fff" }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Floating chips */}
            {[
              { text: "Industry 4.0", top: "8%", right: "-8%" },
              { text: "ISO Certified", top: "72%", right: "-10%" },
              { text: "98% CSAT", top: "18%", left: "-14%" },
              { text: "Since 2012", top: "80%", left: "-8%" },
            ].map((chip) => (
              <div
                key={chip.text}
                className="absolute rounded-full px-4 py-2 text-xs font-bold"
                style={{
                  top: chip.top,
                  right: (chip as any).right,
                  left: (chip as any).left,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {chip.text}
              </div>
            ))}

            {/* Orbit ring */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full border opacity-10"
              style={{ borderColor: "#FF7F00", borderStyle: "dashed" }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const About = () => {
  return (
    <main className="min-h-screen font-sans antialiased">
      <AboutHero />
      <div className="" id="about">
        <CompanyOverview />
        <CoreExpertise />
        <TechEcosystem />
        <IndustriesSection />
        <VisionMission />
        <CTASection />
      </div>
    </main>
  );
};

export default About;

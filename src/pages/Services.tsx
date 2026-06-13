import { useEffect, useRef, useState, type ReactNode } from "react";
import OurServicesGrid from "src/components/OurServicesGrid";
import { Link } from "react-router-dom";

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

// ─── Service Ecosystem Graphic ────────────────────────────────────────────────
const NODES = [
  { id: "ai", label: "AI & ML", icon: "🤖", angle: 0, orbit: 160 },
  { id: "dev", label: "Software Dev", icon: "💻", angle: 60, orbit: 160 },
  { id: "iot", label: "IoT Solutions", icon: "📡", angle: 120, orbit: 160 },
  { id: "mobile", label: "Mobile Apps", icon: "📱", angle: 180, orbit: 160 },
  { id: "cloud", label: "Cloud & DevOps", icon: "☁️", angle: 240, orbit: 160 },
  { id: "auto", label: "Automation", icon: "⚙️", angle: 300, orbit: 160 },
];

function ServiceEcosystem() {
  const [active, setActive] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Slow rotation tick
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  const rotationDeg = tick * 0.15; // degrees per tick

  return (
    <div className="relative  flex items-center justify-center" style={{ width: "100%", height: "420px" }}>

      {/* Outer glow pulse */}
      <div
        aria-hidden
        className="absolute rounded-full animate-ping opacity-[0.06]"
        style={{ width: 380, height: 380, border: "2px solid #FF7F00", animationDuration: "3s" }}
      />

      {/* Orbit ring */}
      <svg
        aria-hidden
        className="absolute"
        style={{ width: 380, height: 380, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        viewBox="0 0 380 380"
      >
        {/* Orbit circle */}
        <circle cx="190" cy="190" r="155" fill="none" stroke="rgba(255,127,0,0.15)" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="190" cy="190" r="100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Connection lines from center to each node */}
        {NODES.map((node) => {
          const rad = ((node.angle + rotationDeg) * Math.PI) / 180;
          const x = 190 + Math.cos(rad) * 155;
          const y = 190 + Math.sin(rad) * 155;
          const isActive = active === node.id;
          return (
            <line
              key={node.id}
              x1="190" y1="190"
              x2={x} y2={y}
              stroke={isActive ? "#FF7F00" : "rgba(255,127,0,0.18)"}
              strokeWidth={isActive ? 1.5 : 0.8}
              strokeDasharray={isActive ? "none" : "4 4"}
              style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
            />
          );
        })}
      </svg>

      {/* Orbiting nodes */}
      {NODES.map((node) => {
        const rad = ((node.angle + rotationDeg) * Math.PI) / 180;
        const cx = 50 + (Math.cos(rad) * 155 / 380) * 100;
        const cy = 50 + (Math.sin(rad) * 155 / 380) * 100;
        const isActive = active === node.id;

        return (
          <div
            key={node.id}
            className="absolute flex flex-col items-center gap-1 cursor-pointer"
            style={{
              left: `calc(${cx}% - 32px)`,
              top: `calc(${cy}% - 32px)`,
              zIndex: 10,
            }}
            onMouseEnter={() => setActive(node.id)}
            onMouseLeave={() => setActive(null)}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-300"
              style={{
                background: isActive
                  ? "#FF7F00"
                  : "rgba(255,255,255,0.08)",
                border: `1.5px solid ${isActive ? "#FF7F00" : "rgba(255,255,255,0.15)"}`,
                backdropFilter: "blur(12px)",
                boxShadow: isActive ? "0 0 24px rgba(255,127,0,0.45)" : "none",
                transform: isActive ? "scale(1.18)" : "scale(1)",
              }}
            >
              {node.icon}
            </div>
            <span
              className="text-[10px] font-bold text-center leading-tight px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{
                color: isActive ? "#FF7F00" : "rgba(255,255,255,0.55)",
                background: isActive ? "rgba(255,127,0,0.1)" : "transparent",
                transition: "color 0.3s",
              }}
            >
              {node.label}
            </span>
          </div>
        );
      })}

      {/* Center hub */}
      <div
        className="relative z-20 flex flex-col items-center justify-center rounded-full"
        style={{
          width: 120, height: 120,
          background: "rgba(255,255,255,0.07)",
          border: "1.5px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Inner spin ring */}
        <div
          className="absolute inset-2 rounded-full border border-dashed animate-spin"
          style={{ borderColor: "rgba(255,127,0,0.3)", animationDuration: "12s" }}
        />
        <div
          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#081D3A,#1a3a6e)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12L12 4L20 12L12 20Z" stroke="#FF7F00" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="3" fill="#FF7F00" />
          </svg>
        </div>
        <div className="relative z-10 mt-1 text-[9px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
          SK Solution
        </div>
      </div>

      {/* Floating stat chips — corners */}
      {[
        { text: "500+ Projects", pos: "top-2 left-0" },
        { text: "12+ Domains", pos: "top-2 right-0" },
        { text: "100+ Clients", pos: "bottom-8 left-0" },
        { text: "15+ Industries", pos: "bottom-8 right-0" },
      ].map((c) => (
        <div
          key={c.text}
          className={`absolute ${c.pos} rounded-full px-3 py-1.5 text-[10px] font-bold`}
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          {c.text}
        </div>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function ServicesHero() {
  return (
    <section
      className="relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 pb-0 pt-24"
      style={{ backgroundColor: "#081D3A" }}
    >
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] opacity-[0.13]"
        style={{ background: "radial-gradient(circle at top right,#FF7F00,transparent 65%)" }}
      />
      {/* Glow bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-20 w-72 h-72 opacity-[0.07]"
        style={{ background: "radial-gradient(circle,#FF7F00,transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl md:py-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left ── */}
          <div className="py-8 lg:py-16">
            {/* Badge */}
            <Reveal delay={50}>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] mb-6"
                style={{ color: "#FF7F00", borderColor: "rgba(255,127,0,0.35)", backgroundColor: "rgba(255,127,0,0.1)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#FF7F00" }} />
                What We Build
              </span>
            </Reveal>

            {/* Headline */}
            <Reveal delay={100}>
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] tracking-tight text-white">
                Enterprise software,
                <br />
                <span className="relative inline-block" style={{ color: "#FF7F00" }}>
                  end to end.
                  <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 280 8" fill="none" aria-hidden>
                    <path d="M2 6 Q70 2 140 6 Q210 10 278 4" stroke="#FF7F00" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
                  </svg>
                </span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={150}>
              <p className="mb-8 text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.52)" }}>
                From the first sensor on a factory floor to the AI model predicting the next failure —
                we design, build, and operate every layer of the technology stack.
                No integrators, no handoffs, no gaps.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={200}>
              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#services"
                  className="rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(255,127,0,0.4)] active:scale-95"
                  style={{ background: "#FF7F00" }}
                >
                  Explore Services
                </a>
                <Link
                  to="/contact"
                  className="rounded-xl border px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:bg-white/10 active:scale-95"
                  style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.72)" }}
                >
                  Contact Us →
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ── Right: Ecosystem ── */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{
              opacity: 1,
              animation: "fadeInRight 0.8s ease 0.2s both",
            }}
          >
            <ServiceEcosystem />
          </div>
        </div>

        {/* Mobile ecosystem — below copy */}
        <div className="lg:hidden pb-4">
          <ServiceEcosystem />
        </div>
      </div>

      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const Services = () => (
  <main className="min-h-screen font-sans antialiased">
    <ServicesHero />
    <div className="" id="services">
      <OurServicesGrid />
    </div>
  </main>
);

export default Services;
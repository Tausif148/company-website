import { useEffect, useRef, useState } from "react";
import OurServicesSlider from "src/components/OurServicesSlider";
import HeroMovingSatalite from "src/components/HeroMovingSatalite";
import { Link } from "react-router";

// ── Types ────────────────────────────────────────────────────────────────────
interface Node {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  color: string;
}

interface Connection {
  from: string;
  to: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const NODES: Node[] = [
  { id: "erp", label: "ERP", icon: "⚙️", x: 50, y: 50, color: "#1453E6" },
  { id: "crm", label: "CRM", icon: "🤝", x: 80, y: 20, color: "#FF7F00" },
  { id: "ai", label: "AI/ML", icon: "🧠", x: 80, y: 80, color: "#8B5CF6" },
  { id: "cloud", label: "Cloud", icon: "☁️", x: 20, y: 20, color: "#0EA5E9" },
  { id: "iot", label: "IoT", icon: "📡", x: 20, y: 80, color: "#10B981" },
  { id: "analytics", label: "Analytics", icon: "📊", x: 50, y: 10, color: "#F59E0B" },
];

const CONNECTIONS: Connection[] = [
  { from: "erp", to: "crm" },
  { from: "erp", to: "ai" },
  { from: "erp", to: "cloud" },
  { from: "erp", to: "iot" },
  { from: "erp", to: "analytics" },
  { from: "crm", to: "analytics" },
  { from: "ai", to: "iot" },
  { from: "cloud", to: "analytics" },
];

const STATS = [
  { value: "500+", label: "Enterprise Projects" },
  { value: "100+", label: "Global Clients" },
  { value: "15+", label: "Industries Served" },
  { value: "99.9%", label: "System Reliability" },
];

const SOLUTION_CARDS = [
  { title: "ERP Suite", desc: "End-to-end resource planning", icon: "⚙️", color: "#1453E6" },
  { title: "CRM Platform", desc: "360° customer intelligence", icon: "🤝", color: "#FF7F00" },
  { title: "AI Automation", desc: "Intelligent process automation", icon: "🧠", color: "#8B5CF6" },
  { title: "Cloud Infra", desc: "Scalable cloud architecture", icon: "☁️", color: "#0EA5E9" },
  { title: "Industrial IoT", desc: "Real-time sensor networks", icon: "📡", color: "#10B981" },
  { title: "BI & Analytics", desc: "Actionable business insights", icon: "📊", color: "#F59E0B" },
];

// ── Animated Network SVG ─────────────────────────────────────────────────────
function EnterpriseNetwork() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const W = 400, H = 340;
  const toXY = (n: Node) => ({ x: (n.x / 100) * W, y: (n.y / 100) * H });

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full max-w-[460px]"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1453E6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#081D3A" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {NODES.map(n => (
            <radialGradient key={`grad-${n.id}`} id={`grad-${n.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.4" />
            </radialGradient>
          ))}
        </defs>

        {/* Background glow */}
        <ellipse cx={W / 2} cy={H / 2} rx={W * 0.45} ry={H * 0.45} fill="url(#bg-glow)" />

        {/* Grid lines subtle */}
        {[0.25, 0.5, 0.75].map(r => (
          <circle
            key={r}
            cx={W / 2} cy={H / 2}
            r={Math.min(W, H) * r * 0.48}
            fill="none" stroke="#1453E6" strokeOpacity="0.06" strokeWidth="1"
            strokeDasharray="4 8"
          />
        ))}

        {/* Connections */}
        {CONNECTIONS.map(({ from, to }, idx) => {
          const a = NODES.find(n => n.id === from)!;
          const b = NODES.find(n => n.id === to)!;
          const ax = toXY(a), bx = toXY(b);
          const active = activeNode === from || activeNode === to;
          const duration = 2 + (idx % 3) * 0.5;
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={ax.x} y1={ax.y} x2={bx.x} y2={bx.y}
                stroke={active ? "#FF7F00" : "#1453E6"}
                strokeOpacity={active ? 0.6 : 0.18}
                strokeWidth={active ? 1.5 : 1}
              />
              {/* Animated dot along the line */}
              <circle r="2.5" fill={active ? "#FF7F00" : "#60A5FA"} opacity={active ? 0.9 : 0.5} filter="url(#glow)">
                <animateMotion
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  path={`M ${ax.x} ${ax.y} L ${bx.x} ${bx.y}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map(n => {
          const { x, y } = toXY(n);
          const isCenter = n.id === "erp";
          const r = isCenter ? 32 : 24;
          const isActive = activeNode === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${x},${y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveNode(n.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Outer pulse ring */}
              {isCenter && (
                <circle r={r + 14} fill="none" stroke={n.color} strokeOpacity="0.15" strokeWidth="1">
                  <animate attributeName="r" values={`${r + 10};${r + 22};${r + 10}`} dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              {isActive && (
                <circle r={r + 10} fill="none" stroke={n.color} strokeOpacity="0.3" strokeWidth="1.5" />
              )}
              {/* Node circle */}
              <circle r={r} fill={`url(#grad-${n.id})`} filter={isActive || isCenter ? "url(#glow)" : ""} />
              <circle r={r} fill="none" stroke={n.color} strokeOpacity="0.5" strokeWidth="1.5" />
              {/* Icon */}
              <text textAnchor="middle" dominantBaseline="middle" fontSize={isCenter ? 16 : 12} y={isCenter ? -6 : -5}>
                {n.icon}
              </text>
              {/* Label */}
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                y={isCenter ? 10 : 8}
                fontSize={isCenter ? 9 : 7.5}
                fill="white"
                fontWeight="700"
                letterSpacing="0.5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Floating Solution Card ───────────────────────────────────────────────────
function SolutionCard({ title, desc, icon, color, delay }: {
  title: string; desc: string; icon: string; color: string; delay: number;
}) {
  return (
    <div
      className="group relative rounded-xl p-3 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${color}22`, border: `1px solid ${color}44` }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs font-700 leading-tight" style={{ fontWeight: 700 }}>{title}</p>
          <p className="text-blue-200 text-[10px] leading-tight opacity-70 mt-0.5 truncate">{desc}</p>
        </div>
        <div
          className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

// ── Stat Chip ────────────────────────────────────────────────────────────────
function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span
        className="text-2xl sm:text-3xl font-black leading-none"
        style={{ color: "#FF7F00", fontFamily: "Inter, sans-serif" }}
      >
        {value}
      </span>
      <span className="text-xs text-blue-300 mt-0.5 leading-tight">{label}</span>
    </div>
  );
}

// ── Main Hero ────────────────────────────────────────────────────────────────
const Enterprise: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-[#081D3A]  overflow-hidden pb-0">
      <section
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden flex items-center"
        style={{ background: "#081D3A", fontFamily: "Inter, sans-serif" }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Grid */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-[0.04]">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Ambient blobs */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vh] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #1453E6 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #FF7F00 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center">

            {/* ── LEFT COLUMN ── */}
            <div
              className="flex flex-col gap-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 w-fit">
                <div
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "rgba(255,127,0,0.12)",
                    border: "1px solid rgba(255,127,0,0.35)",
                    color: "#FF7F00",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7F00] animate-pulse inline-block" />
                  Enterprise Solutions
                </div>
              </div>

              {/* Headline */}
              <div>
                <h1
                  className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight"
                  style={{ color: "#EEF3FB" }}
                >
                  Transform Your
                  <br />
                  <span style={{ color: "#FF7F00" }}>Enterprise</span>
                  <br />
                  <span

                  >
                    Digitally.
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p
                className="text-base sm:text-lg leading-relaxed max-w-lg"
                style={{ color: "#93B4D8" }}
              >
                Unify your operations with an interconnected suite of enterprise platforms — ERP, CRM, AI, IoT, and Cloud — engineered for Fortune 500-scale performance.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href="#enterprise"
                  className="group relative px-7 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #FF7F00, #FF5500)",
                    boxShadow: "0 4px 24px rgba(255,127,0,0.35)",
                  }}
                >
                  <span className="relative z-10">Explore Solutions →</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </a>
                <Link
                  to="/contact"
                  className="group px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#EEF3FB",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,127,0,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                >
                  Request Demo
                </Link>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
                }}
              >
                {STATS.map(s => <StatChip key={s.label} {...s} />)}
              </div>

              {/* Trust indicators */}
              <div
                className="flex items-center gap-3 pt-2"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 1s ease 0.5s",
                }}
              >
                <div className="flex -space-x-2">
                  {["#1453E6", "#FF7F00", "#8B5CF6", "#10B981"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] text-white font-bold"
                      style={{ background: c, borderColor: "#081D3A" }}
                    >
                      {["M", "T", "A", "G"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#93B4D8" }}>
                  Trusted by <span className="text-white font-semibold">100+ enterprises</span> across 15 industries
                </p>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div
              className="relative flex flex-col gap-5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
              }}
            >
              {/* Glassmorphism panel wrapping the network */}
              <div
                className="relative rounded-2xl p-6 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* Panel header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wide" style={{ color: "#93B4D8" }}>
                      LIVE OurServicesSlider
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(20,83,230,0.2)", color: "#60A5FA", border: "1px solid rgba(20,83,230,0.3)" }}>
                    6 Modules Active
                  </span>
                </div>
                {/* Network viz */}
                <div style={{ height: "260px" }}>
                  <EnterpriseNetwork />
                </div>
              </div>

              {/* Solution cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SOLUTION_CARDS.map((card, i) => (
                  <SolutionCard key={card.title} {...card} delay={i * 80} />
                ))}
              </div>

              {/* Live metrics bar */}
              <div
                className="rounded-xl px-5 py-3 flex items-center justify-between gap-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {[
                  { label: "Uptime", value: "99.9%", color: "#10B981" },
                  { label: "Data Processed", value: "2.4TB/day", color: "#60A5FA" },
                  { label: "Active Nodes", value: "1,247", color: "#FF7F00" },
                ].map(m => (
                  <div key={m.label} className="flex flex-col items-center">
                    <span className="text-sm font-bold" style={{ color: m.color }}>{m.value}</span>
                    <span className="text-[10px] mt-0.5" style={{ color: "#93B4D8" }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="" id="enterprise">
        <HeroMovingSatalite />
        <OurServicesSlider />
      </div>

    </main>
  );
};

export default Enterprise;




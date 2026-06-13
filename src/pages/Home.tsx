// import HomeMain from "src/components/HomeMain";
import OurServicesGrid from "src/components/OurServicesGrid";
import IndustryGrid from "src/components/IndustryGrid";
import ImpactMetrics from "src/components/ImpactMetrics";
import ProductSlider from "src/components/ProductSlider";
import TestimonialSlider from "src/components/TestimonialSlider";
import ERPHighlightSection from "src/components/ERPHighlightSection";
import DigitalSovereignty from "src/components/DigitalSovereignty";
import ServicesCardSection from "src/components/ServicesCardSection";
import GlassContact from "src/components/GlassContact";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface TechBadge {
  label: string;
  icon: string;
}

interface FloatingCard {
  icon: string;
  title: string;
  subtitle: string;
  position: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS: StatItem[] = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Enterprise Clients" },
];

const TECH_BADGES: TechBadge[] = [
  { label: "Artificial Intelligence", icon: "🤖" },
  { label: "IoT", icon: "📡" },
  { label: "Cloud Solutions", icon: "☁️" },
  { label: "Mobile Apps", icon: "📱" },
  { label: "Automation", icon: "⚙️" },
  { label: "Industry 4.0", icon: "🏭" },
];

const FLOATING_CARDS: FloatingCard[] = [
  {
    icon: "🏗️",
    title: "Industrial ERP",
    subtitle: "94% Efficiency",
    position: "top-[8%] left-[0%]",
  },
  {
    icon: "🎓",
    title: "School ERP",
    subtitle: "Active Nodes: 1.2k",
    position: "top-[8%] right-[0%]",
  },
  {
    icon: "📊",
    title: "Data Engine",
    subtitle: "Real-time Analytics",
    position: "bottom-[22%] left-[0%]",
  },
  {
    icon: "🔗",
    title: "IoT Platform",
    subtitle: "Connected Devices",
    position: "bottom-[6%] right-[0%]",
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix,
  trigger,
}: {
  target: number;
  suffix: string;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const HomeHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #EEF3FB 0%, #dce8f8 60%, #c8dcf5 100%)",
        /* Navbar is typically ~64–72px; pt accounts for it */
        paddingTop: "clamp(88px, 10vw, 120px)",
        paddingBottom: 0,
      }}
    >
      {/* ── Subtle background orbs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #FF7F00 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #081D3A 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        {/* ── Main two-column grid ── */}
        <div className="grid lg:grid-cols-2 items-center">
          {/* ── LEFT COLUMN ── */}
          <div
            className="flex flex-col py-4 text-center sm:text-left items-center sm:items-start"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Pill badge */}
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border"
              style={{
                background: "rgba(8,29,58,0.07)",
                borderColor: "rgba(8,29,58,0.15)",
                color: "#081D3A",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                style={{ background: "#FF7F00" }}
              />
              Powering Industry 4.0 Since 2012
            </span>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] 
              
              
              font-extrabold leading-[1.07] tracking-tight"
              style={{ color: "#081D3A" }}
            >
              Everything{" "}
              <span
                className="relative inline-block"
                style={{ color: "#FF7F00" }}
              >
                Connected
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 240 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2 6 Q60 2 120 6 Q180 10 238 4"
                    stroke="#FF7F00"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </span>
              .<br />
              Everything <span style={{ color: "#FF7F00" }}>Intelligent</span>.
            </h1>

            {/* Description */}
            <p
              className="py-2 text-base sm:text-md leading-relaxed max-w-[480px]"
              style={{ color: "#3d5a80" }}
            >
              We build enterprise-grade software, AI systems, IoT platforms, and
              cloud solutions that transform how industries operate — from the
              shop floor to the boardroom.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start py-2">
              <Link
                to="/contact"
                className="group relative px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: "#FF7F00" }}
              >
                <span className="relative z-10">Start Your Project</span>
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #FF7F00, #e86d00)",
                  }}
                />
              </Link>

              <Link
                to="/contact"
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base border-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: "#081D3A",
                  color: "#081D3A",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#081D3A";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#081D3A";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </Link>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
              {TECH_BADGES.map((badge, i) => (
                <span
                  key={badge.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default select-none transition-all duration-200"
                  style={{
                    background:
                      hoveredBadge === i ? "#081D3A" : "rgba(8,29,58,0.08)",
                    color: hoveredBadge === i ? "#fff" : "#081D3A",
                    transform: hoveredBadge === i ? "scale(1.06)" : "scale(1)",
                    boxShadow:
                      hoveredBadge === i
                        ? "0 4px 14px rgba(8,29,58,0.25)"
                        : "none",
                  }}
                  onMouseEnter={() => setHoveredBadge(i)}
                  onMouseLeave={() => setHoveredBadge(null)}
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Illustration ── */}
          <div
            className="relative flex flex-col items-center justify-center h-[320px] sm:h-[420px] lg:h-[560px] mt-8 lg:mt-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {/* Central glassmorphism hub */}
            <div
              className="relative z-10 rounded-full flex flex-col items-center justify-center shadow-2xl"
              style={{
                width: "clamp(180px, 45vw, 300px)",
                height: "clamp(180px, 45vw, 300px)",
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255,255,255,0.8)",
              }}
            >
              {/* Orbit rings */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin"
                style={{ animationDuration: "18s" }}
                viewBox="0 0 320 320"
                fill="none"
              >
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  stroke="#FF7F00"
                  strokeWidth="1.5"
                  strokeDasharray="12 8"
                  opacity="0.4"
                />
              </svg>

              <svg
                className="absolute inset-0 w-full h-full animate-spin"
                style={{
                  animationDuration: "28s",
                  animationDirection: "reverse",
                }}
                viewBox="0 0 320 320"
                fill="none"
              >
                <circle
                  cx="160"
                  cy="160"
                  r="130"
                  stroke="#081D3A"
                  strokeWidth="1"
                  strokeDasharray="6 12"
                  opacity="0.2"
                />
              </svg>

              {/* Brand mark */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #081D3A 0%, #1a3a6e 100%)",
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
                    <path
                      d="M8 22 L22 8 L36 22 L22 36 Z"
                      stroke="#FF7F00"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <circle cx="22" cy="22" r="5" fill="#FF7F00" />
                  </svg>
                </div>

                <div className="text-center">
                  <div
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "#081D3A" }}
                  >
                    SK
                  </div>

                  <div
                    className="text-[10px] tracking-wider uppercase"
                    style={{ color: "#FF7F00" }}
                  >
                    SOLUTION
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Floating Cards */}
            <div className="hidden lg:block">
              {FLOATING_CARDS.map((card) => (
                <div
                  key={card.title}
                  className={`absolute ${card.position} group`}
                >
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                    style={{
                      background: "rgba(255,255,255,0.78)",
                      backdropFilter: "blur(16px)",
                      border: "1.5px solid rgba(255,255,255,0.9)",
                      minWidth: "148px",
                      maxWidth: "170px",
                    }}
                  >
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: "rgba(8,29,58,0.07)" }}
                    >
                      {card.icon}
                    </span>

                    <div>
                      <div
                        className="text-xs font-bold leading-tight"
                        style={{ color: "#081D3A" }}
                      >
                        {card.title}
                      </div>

                      <div
                        className="text-[10px] mt-0.5"
                        style={{ color: "#FF7F00" }}
                      >
                        {card.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-sm lg:hidden">
              {FLOATING_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="flex items-center gap-2 p-3 rounded-xl shadow-md"
                  style={{
                    background: "rgba(255,255,255,0.78)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span className="text-lg">{card.icon}</span>

                  <div>
                    <div
                      className="text-[11px] font-bold"
                      style={{ color: "#081D3A" }}
                    >
                      {card.title}
                    </div>

                    <div
                      className="text-[10px]"
                      style={{ color: "#FF7F00" }}
                    >
                      {card.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pulse Rings Desktop Only */}
            <div
              aria-hidden
              className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border animate-ping opacity-[0.06]"
              style={{
                width: "clamp(300px, 38vw, 380px)",
                height: "clamp(300px, 38vw, 380px)",
                borderColor: "#081D3A",
                animationDuration: "3s",
              }}
            />

            <div
              aria-hidden
              className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border animate-ping opacity-[0.04]"
              style={{
                width: "clamp(380px, 46vw, 460px)",
                height: "clamp(380px, 46vw, 460px)",
                borderColor: "#FF7F00",
                animationDuration: "4s",
                animationDelay: "1s",
              }}
            />
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div
          ref={statsRef}
          className="relative z-10 mt-10 sm:mt-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-t-2xl shadow-xl"
            style={{ background: "rgba(8,29,58,0.15)" }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center transition-all duration-300 hover:brightness-95"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tabular-nums"
                  style={{ color: i % 2 === 0 ? "#081D3A" : "#FF7F00" }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    trigger={statsVisible}
                  />
                </div>
                <div
                  className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "#5a7a9a" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <main className="relative">
      <HomeHero />
      <div className="" id="home">
        <OurServicesGrid />
        <IndustryGrid />
        <ImpactMetrics />
        <ProductSlider />
        <TestimonialSlider />
        <ERPHighlightSection />
        <DigitalSovereignty />
        <ServicesCardSection />
        <GlassContact />
      </div>
    </main>
  );
};

export default Home;

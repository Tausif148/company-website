import React from "react";
import { useReveal } from "../hooks/useReveal";
import { useTilt } from "../hooks/useTilt";

// ─── Reusable 3D Feature Card ──────────────────────────────────────────────
interface FeatureCardProps {
  icon: string;
  title: string;
  subtitle: string;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  subtitle,
  delay,
}) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(10);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        transitionDelay: delay,
        willChange: "transform",
      }}
      className="reveal flex items-center gap-4 bg-[#EEF3FB] border border-[#DCE6F8] rounded-2xl p-4 hover:shadow-xl cursor-default"
    >
      {/* Icon pushed forward in Z */}
      <div
        className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1453E6]/10 flex items-center justify-center"
        style={{ transform: "translateZ(20px)" }}
      >
        <span className="material-symbols-outlined text-[#1453E6] text-[22px] sm:text-[24px]">
          {icon}
        </span>
      </div>

      {/* Text pushed forward in Z */}
      <div className="min-w-0" style={{ transform: "translateZ(20px)" }}>
        <h4 className="font-semibold text-[13px] sm:text-[14px] text-[#081D3A] truncate">
          {title}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
};

// ─── IndustryGrid ──────────────────────────────────────────────────────────
const IndustryGrid: React.FC = () => {
  useReveal();

  // Tilt for the main image card
  const {
    ref: imageCardRef,
    onMouseMove: imageMouseMove,
    onMouseLeave: imageMouseLeave,
  } = useTilt<HTMLDivElement>(12);

  return (
    <section className="bg-[#ffffff] py-12 sm:py-16 lg:py-20 xl:py-22 overflow-hidden">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
        {/* ── Left Content ── */}
        <div className="flex flex-col">
          <span className="block text-[#1453E6] text-xs font-semibold tracking-[5px] uppercase mb-4">
            WHO WE ARE
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-bold text-[#081D3A] leading-tight mb-4">
            Technology Innovation Partner
          </h2>

          <p className="text-sm sm:text-[16px] leading-[1.7] text-slate-600 mb-8 lg:mb-10 max-w-xl">
            SK Solution helps organizations modernize operations
            through intelligent ERP platforms, industrial IoT ecosystems,
            embedded technologies, automation systems, and scalable software
            solutions.
            <br className="hidden sm:block" />
            <br className="hidden sm:block" />
            <span className="block mt-4 sm:mt-0">
              Our mission is to bridge the gap between business challenges and
              digital transformation through innovative, reliable, and
              future-ready technologies.
            </span>
          </p>

          {/* Feature Cards — each has independent tilt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon="bolt"
              title="Energy Optimization"
              subtitle="Reduction in waste by 24%"
            />
            <FeatureCard
              icon="precision_manufacturing"
              title="Predictive Maintenance"
              subtitle="Down-time reduced by 40h/mo"
              delay="100ms"
            />
          </div>
        </div>

        {/* ── Right Image — 3D tilt card ── */}
        <div
          className="reveal relative group"
          style={{ perspective: "2000px" }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[#1453E6]/10 rounded-3xl blur-3xl group-hover:bg-[#1453E6]/20 transition-all duration-500" />

          {/* Tilt wrapper */}
          <div
            ref={imageCardRef}
            onMouseMove={imageMouseMove}
            onMouseLeave={imageMouseLeave}
            className="relative glass rounded-3xl overflow-hidden border border-white/50 shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
              willChange: "transform",
            }}
          >
            {/* Image — lifted further in Z */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtJ0xUr3qkr0w9DYDnocwLjSngkXd5YOxc8oljCHPF6nq-LC0HBFPUoDxvfZbo0W2A1QGZ0JHijgFyZsCP0YxPpyBOVuZmxjTSMbswhPVZrv4YbWOSd5EgMdtf_wCEPzNgRKiFcJLYTsVgG1cdnS2ZJnFFraMNFvHTVlRh0DVtPy3za7Z7xO5bnYxPlG0zp1QWo40xxCAyAsfo7cB6YHHJAdZXukcQD-WNv96B_MleSZ6N2rKSaer1CWigHYUm-G1nkcR7bTVqNI4"
              alt="Digital Twin"
              className="w-full object-cover aspect-video hover:scale-105 transition-transform duration-700"
              style={{ transform: "translateZ(10px)" }}
            />

            {/* Badge — lifted highest */}
            <div
              className="absolute top-3 right-3 sm:top-4 sm:right-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1453E6] text-white rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
              LIVE FEED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryGrid;

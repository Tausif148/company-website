import React, { useRef, useEffect, useCallback, useState } from "react";
import { OrbConfig, HeroTagline } from "src/types/home.types";
import { useMouseGlow } from "../hooks/useMouseGlow";

// ─── Data ─────────────────────────────────────────────────────────────────────
const TAGLINES: HeroTagline[] = [
  { id: "erp", label: "ERP" },
  { id: "iot", label: "IoT" },
  { id: "industry", label: "Industry 4.0" },
  { id: "automation", label: "Automation" },
  { id: "devices", label: "Smart Devices" },
];

interface OrbConfigExtended extends OrbConfig {
  xMobile: number;
  yMobile: number;
  xTablet: number;
  yTablet: number;
}

const SATELLITE_ORBS: OrbConfigExtended[] = [
  {
    id: "data-engine",
    icon: "query_stats",
    label: "Data Engine",
    subLabel: "",
    size: "sm",
    // desktop
    x: 56,
    y: 18,
    // tablet: spread top row
    xTablet: 58,
    yTablet: 14,
    // mobile: top-center
    xMobile: 50,
    yMobile: 8,
    floatAmp: 7,
    floatSpeed: 4.2,
    floatOffset: 0,
  },
  {
    id: "industrial-erp",
    icon: "factory",
    label: "Industrial ERP",
    subLabel: "94% Efficiency",
    size: "lg",
    x: 32,
    y: 32,
    xTablet: 22,
    yTablet: 30,
    // mobile: left side, lower than data-engine
    xMobile: 18,
    yMobile: 26,
    floatAmp: 9,
    floatSpeed: 5.5,
    floatOffset: 1.1,
  },
  {
    id: "school-erp",
    icon: "school",
    label: "School ERP",
    subLabel: "Active Nodes: 1.2k",
    size: "lg",
    x: 69,
    y: 37,
    xTablet: 76,
    yTablet: 30,
    // mobile: right side, mirror of industrial-erp
    xMobile: 78,
    yMobile: 26,
    floatAmp: 6,
    floatSpeed: 4.8,
    floatOffset: 2.3,
  },
  {
    id: "iot",
    icon: "sensors",
    label: "IoT Ecosystem",
    subLabel: "Real-time Stream",
    size: "lg",
    x: 26,
    y: 68,
    xTablet: 18,
    yTablet: 65,
    // mobile: left-lower, well below top row
    xMobile: 12,
    yMobile: 64,
    floatAmp: 8,
    floatSpeed: 6.0,
    floatOffset: 0.7,
  },
  {
    id: "automation",
    icon: "precision_manufacturing",
    label: "Automation",
    subLabel: "Live Sync",
    size: "md",
    x: 67,
    y: 75,
    xTablet: 76,
    yTablet: 65,
    // mobile: right-lower, mirror of iot
    xMobile: 76,
    yMobile: 64,
    floatAmp: 5,
    floatSpeed: 3.9,
    floatOffset: 3.5,
  },
];

// ─── Responsive Orb Size Map ──────────────────────────────────────────────────
function getOrbPx(size: OrbConfig["size"], containerWidth: number): number {
  const scale = Math.max(0.38, Math.min(1.0, containerWidth / 1440));
  const base = { xs: 90, sm: 120, md: 160, lg: 200, xl: 260 };
  const raw = Math.round(base[size] * scale);
  if (containerWidth < 480 && (size === "lg" || size === "md")) {
    return Math.min(raw, size === "lg" ? 80 : 70);
  }
  return raw;
}

function getIconSize(size: OrbConfig["size"], containerWidth: number): string {
  const scale = Math.max(0.38, Math.min(1.0, containerWidth / 1440));
  const basePx = { xs: 20, sm: 28, md: 36, lg: 40, xl: 48 };
  return `${Math.round(basePx[size] * scale)}px`;
}

function getOrbPosition(orb: OrbConfigExtended, containerWidth: number) {
  if (containerWidth < 640) return { x: orb.xMobile, y: orb.yMobile };
  if (containerWidth < 1024) return { x: orb.xTablet, y: orb.yTablet };
  return { x: orb.x, y: orb.y };
}

// ─── Particle Canvas ────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 150;
const MOUSE_RADIUS = 250;

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame: number;
    let particles: Particle[] = [];

    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
    });

    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }

      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;

        particle.x -= dx * force * 0.02;
        particle.y -= dy * force * 0.02;
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

      ctx.fillStyle = "rgba(59,130,246,0.35)";
      ctx.fill();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();

            ctx.strokeStyle = `rgba(
              59,
              130,
              246,
              ${0.15 * (1 - distance / CONNECTION_DISTANCE)}
            )`;

            ctx.lineWidth = 1;

            ctx.moveTo(particles[i].x, particles[i].y);

            ctx.lineTo(particles[j].x, particles[j].y);

            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      drawConnections();

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);

      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        absolute
        inset-0
        w-full
        h-full
        pointer-events-none
        opacity-60
      "
    />
  );
};

// ─── Ambient Blobs ────────────────────────────────────────────────────────────
const AmbientBlobs: React.FC = () => (
  <>
    <div
      className="ambient-blob w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-300"
      style={{ top: "10%", left: "5%" }}
      aria-hidden="true"
    />
    <div
      className="ambient-blob w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-300"
      style={{ top: "20%", right: "8%" }}
      aria-hidden="true"
    />
    <div
      className="ambient-blob w-36 h-36 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-blue-200"
      style={{ bottom: "15%", left: "30%" }}
      aria-hidden="true"
    />
  </>
);

// ─── Hero Text ────────────────────────────────────────────────────────────────
const TaglineDot: React.FC = () => (
  <span
    className="w-1.5 h-1.5 rounded-full bg-blue-400/70 inline-block"
    aria-hidden="true"
  />
);

const HeroText: React.FC = () => (
  <div className="text-center z-10 relative pt-[110px] px-4 sm:px-6 sm:pt-50 lg:pt-30 sm:pb-8 lg:pb-0 pointer-events-none select-none">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05] mb-4 sm:mb-6">
      Everything Connected.
      <br />
      Everything Intelligent.
    </h1>
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-500/90 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4 font-semibold">
      {TAGLINES.map((tag, index) => (
        <React.Fragment key={tag.id}>
          <span>{tag.label}</span>
          {index < TAGLINES.length - 1 && <TaglineDot />}
        </React.Fragment>
      ))}
    </p>
  </div>
);

// ─── Canvas ───────────────────────────────────────────────────────────────────
const OrbCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbEls = useRef<Map<number, HTMLDivElement>>(new Map());
  const rafRef = useRef<number>(0);
  const [containerWidth, setContainerWidth] = useState(1440);

  const reducedMotion = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  const setOrbRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (el) {
        orbEls.current.set(index, el);
      } else {
        orbEls.current.delete(index);
      }
    },
    [],
  );

  // Track container width for responsive scaling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    setContainerWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const animate = useCallback(function animate(ts: number) {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const t = ts / 1000;

    SATELLITE_ORBS.forEach((orb, i) => {
      const el = orbEls.current.get(i);
      if (!el) return;

      const px = getOrbPx(orb.size, width);
      const pos = getOrbPosition(orb, width);
      const restX = (pos.x / 100) * width - px / 2;
      const restY = (pos.y / 100) * height - px / 2;
      const bob = reducedMotion.current
        ? 0
        : Math.sin((t / orb.floatSpeed) * Math.PI * 2 + orb.floatOffset) *
          orb.floatAmp;

      el.style.transform = `translate(${restX}px, ${restY + bob}px)`;
    });

    rafRef.current = requestAnimationFrame((ts) => animate(ts));
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // Canvas height: shorter on mobile, taller on desktop
  return (
    <div
      ref={containerRef}
      className="relative w-full flex-1 flex items-end justify-center pb-10 sm:pb-14 lg:pb-16 min-h-[560px] sm:min-h-[580px] lg:min-h-[650px] overflow-hidden"
    >
      {SATELLITE_ORBS.map((orb, i) => (
        <OrbNode
          key={orb.id}
          orb={orb}
          containerWidth={containerWidth}
          setRef={setOrbRef(i)}
        />
      ))}
      <div
        className="relative z-20"
        style={{
          transform:
            containerWidth < 640 ? "translateY(-180px)" : "translateY(0)",
        }}
      >
        <CoreOrb containerWidth={containerWidth} />
      </div>
    </div>
  );
};

// ─── Core Orb ─────────────────────────────────────────────────────────────────
interface CoreOrbProps {
  containerWidth: number;
}

const CoreOrb: React.FC<CoreOrbProps> = ({ containerWidth }) => {
  const { handleMouseMove } = useMouseGlow();
  const scale = Math.max(0.38, Math.min(1.0, containerWidth / 1440));
  const size = Math.max(140, Math.round(260 * scale));
  const iconPx = Math.max(28, Math.round(48 * scale));
  const titleSize =
    containerWidth < 640
      ? "text-xl"
      : scale < 0.7
        ? "text-base"
        : scale < 0.85
          ? "text-lg"
          : "text-2xl";
  return (
    <div
      className="glass-orb rounded-full flex flex-col items-center justify-center cursor-pointer float-core shrink-0"
      style={{ width: size, height: size }}
      role="button"
      tabIndex={0}
      aria-label="CORE OS — Operational"
      onMouseMove={handleMouseMove}
    >
      <span
        className="material-symbols-outlined text-blue-600 mb-1 orb-icon-glow"
        style={{ fontSize: iconPx, fontVariationSettings: "'FILL' 1" }}
        aria-hidden="true"
      >
        hub
      </span>
      <span
        className={`${titleSize} font-black tracking-[0.15em] text-slate-800 mt-1`}
      >
        CORE OS
      </span>
      <div className="flex items-center gap-2 mt-2">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
        </span>
        <span
          className={`${
            containerWidth < 640 ? "text-[9px]" : "text-[11px]"
          } font-bold uppercase tracking-[0.2em] text-blue-500`}
        >
          Operational
        </span>
      </div>
    </div>
  );
};

// ─── Satellite Orb ────────────────────────────────────────────────────────────
interface OrbNodeProps {
  orb: OrbConfigExtended;
  containerWidth: number;
  setRef: (el: HTMLDivElement | null) => void;
}

const OrbNode: React.FC<OrbNodeProps> = ({ orb, containerWidth, setRef }) => {
  const { icon, label, subLabel, size } = orb;
  const { handleMouseMove } = useMouseGlow();
  const px = getOrbPx(size, containerWidth);
  const iconSize = getIconSize(size, containerWidth);
  const scale = Math.max(0.55, Math.min(1.0, containerWidth / 1440));
  const labelSize =
    containerWidth < 640
      ? "text-[9px]"
      : scale < 0.7
        ? "text-[11px]"
        : "text-sm";

  const subSize =
    containerWidth < 640
      ? "text-[8px]"
      : scale < 0.7
        ? "text-[9px]"
        : "text-[11px]";

  return (
    <div
      ref={setRef}
      className="absolute glass-orb rounded-full flex flex-col items-center justify-center cursor-pointer will-change-transform"
      style={{ width: px, height: px, top: 0, left: 0 }}
      onMouseMove={handleMouseMove}
    >
      <span
        className="material-symbols-outlined text-blue-600 mb-1 orb-icon-glow"
        style={{ fontSize: iconSize }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span
        className={`${labelSize} font-semibold text-slate-800 text-center px-3 leading-tight`}
      >
        {label}
      </span>
      {subLabel && (
        <span className={`${subSize} text-slate-500 mt-0.5`}>{subLabel}</span>
      )}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const HomeMain: React.FC = () => (
  <main className="home-main relative flex flex-col overflow-x-hidden">
    <div
      className="home-bg absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />

    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white">
      <ParticleCanvas />
    </div>
    <AmbientBlobs />
    <HeroText />
    <OrbCanvas />
  </main>
);

export default HomeMain;

import React, { useEffect } from "react";
import { useReveal } from "../hooks/useReveal";

const HeroMovingSatalite: React.FC = () => {
  useReveal();

  useEffect(() => {
    const orbitItems = document.querySelectorAll(
      ".orbit-item",
    ) as NodeListOf<HTMLElement>;

    let angle = 0;
    let animationFrame: number;

    const getRadius = () => {
      const w = window.innerWidth;
      if (w < 480) return 110;
      if (w < 768) return 150;
      if (w < 1024) return 185;
      return 220;
    };

    const animateOrbit = () => {
      angle += 0.005;
      const radius = getRadius();

      orbitItems.forEach((item) => {
        const offset = Number(item.dataset.orbitOffset);

        const x = Math.cos(angle + offset) * radius;
        const y = Math.sin(angle + offset) * radius;

        item.style.transform = `translate(${x}px, ${y}px)`;
      });

      animationFrame = requestAnimationFrame(animateOrbit);
    };

    animateOrbit();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="relative min-h-100vh  flex flex-col items-center justify-center py-10 sm:pt-10 md:pt-14 overflow-hidden bg-[#F7F8FC] reveal">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="ambient-blob absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[100px]" />
        <div
          className="ambient-blob absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-indigo-400/5 rounded-full blur-[60px] md:blur-[80px]"
          style={{ animationDelay: "-5s" }}
        />
      </div>

      {/* Hero Heading */}
      <div className="text-center max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 reveal">
        <h1 className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[78px] leading-[1.05] font-bold tracking-[-0.04em] text-[#081D3A]">
          One Technology
          <br />
          Ecosystem.
          <br />
          <span
            className="text-[#1453E6]"
            style={{ textShadow: "0 4px 18px rgba(20,83,230,0.18)" }}
          >
            Infinite Business
            <br />
            Possibilities.
          </span>
        </h1>
      </div>

      {/* Orbit Container */}
      <div className="relative w-full h-[360px] sm:h-[480px] md:h-[560px] lg:h-[600px] orbital-container max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl reveal">
        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 reveal">
          <div className="flex flex-col items-center">
            <div className="floating">
              <div className="w-[80px] h-[80px] sm:w-[105px] sm:h-[105px] md:w-[120px] md:h-[120px] lg:w-[135px] lg:h-[135px] bg-[#ffffff] rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] border border-[#BFD4FF] shadow-[0_10px_30px_rgba(20,83,230,0.12)] flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#1453E6]"
                  style={{
                    fontSize: "clamp(28px, 5vw, 54px)",
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  hub
                </span>
              </div>
              <p className="mt-2 sm:mt-3 md:mt-4 text-[12px] sm:text-[14px] md:text-[16px] font-semibold text-[#1453E6] text-center">
                SK Solution Core
              </p>
            </div>
          </div>
        </div>

        {/* ERP */}
        <div
          className="orbit-item absolute top-1/2 left-1/2 reveal"
          data-orbit-offset="0"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 glass rounded-xl sm:rounded-2xl flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl text-slate-600">
              inventory
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs">ERP</span>
          </div>
        </div>

        {/* IoT */}
        <div
          className="orbit-item absolute top-1/2 left-1/2 reveal"
          data-orbit-offset="1.57"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 glass rounded-xl sm:rounded-2xl flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl text-slate-600">
              sensors
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs">IoT</span>
          </div>
        </div>

        {/* BI */}
        <div
          className="orbit-item absolute top-1/2 left-1/2 reveal"
          data-orbit-offset="3.14"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 glass rounded-xl sm:rounded-2xl flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl text-slate-600">
              monitoring
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs">BI</span>
          </div>
        </div>

        {/* BANK */}
        <div
          className="orbit-item absolute top-1/2 left-1/2 reveal"
          data-orbit-offset="4.71"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 glass rounded-xl sm:rounded-2xl flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl text-slate-600">
              payments
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs">BANK</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMovingSatalite;
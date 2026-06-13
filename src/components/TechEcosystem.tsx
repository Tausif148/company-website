import React from "react";

const TechEcosystem: React.FC = () => {
  return (
    <section className="bg-[#020B3A] py-8 sm:py-4 lg:py-6 xl:py-10 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#ffffff]/10 text-white text-sm font-semibold mb-6">
            TECHNOLOGY ECOSYSTEM
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The SK Solution Tech Ecosystem
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-white/70 leading-8">
            A unified framework of intelligence connecting every node of your
            industrial operation.
          </p>
        </div>

        {/* Orbit System */}
        <div className="relative mx-auto w-[700px] h-[700px] hidden lg:flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute w-[620px] h-[620px] rounded-full border border-[#1453E6]/20" />

          {/* Inner Ring */}
          <div className="absolute w-[380px] h-[380px] rounded-full border border-[#1453E6]/20" />

          {/* Center Hub */}
          <div className="z-20 px-14 py-7 rounded-full bg-[#1453E6] border-4 border-[#081D3A] shadow-[0_0_80px_rgba(20,83,230,0.45)]">
            <span className="text-white font-bold tracking-[0.15em] text-lg">
              CORE INTELLIGENCE
            </span>
          </div>

          {/* Orbit 1 */}
          <div className="orbit orbit-large">
            <div className="orbit-node">ERP CORE</div>
          </div>

          {/* Orbit 2 */}
          <div className="orbit orbit-large reverse delay-1">
            <div className="orbit-node">IOT EDGE</div>
          </div>

          {/* Orbit 3 */}
          <div className="orbit orbit-medium delay-2">
            <div className="orbit-node">AI ANALYTICS</div>
          </div>

          {/* Orbit 4 */}
          <div className="orbit orbit-medium reverse delay-3">
            <div className="orbit-node">CLOUD NATIVE</div>
          </div>

          {/* Orbit 5 */}
          <div className="orbit orbit-small delay-4">
            <div className="orbit-node">AUTOMATION</div>
          </div>

          {/* Orbit 6 */}
          <div className="orbit orbit-small reverse delay-5">
            <div className="orbit-node">EMBEDDED</div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="grid grid-cols-2 gap-4 lg:hidden mt-12">
          {[
            "ERP CORE",
            "IOT EDGE",
            "AI ANALYTICS",
            "CLOUD NATIVE",
            "AUTOMATION",
            "EMBEDDED",
          ].map((item) => (
            <div
              key={item}
              className="bg-[#ffffff]/5 border border-white/10 rounded-2xl py-5 text-center text-white text-sm font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechEcosystem;

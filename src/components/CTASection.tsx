import React from "react";
import { Link } from "react-router-dom";

const CTASection: React.FC = () => {
  return (
    <section className="bg-[#ffffff] py-8 sm:py-16 lg:py-20 xl:py-22 overflow-hidden">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] lg:rounded-[48px] bg-[#081D3A] px-6 py-14 sm:px-12 sm:py-18 md:px-16 lg:px-24 lg:py-28 text-center">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#1453E6] blur-[100px] sm:blur-[120px] lg:blur-[140px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-[#1453E6] blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ffffff]/10 text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide">
              START YOUR DIGITAL JOURNEY
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 sm:mb-7 lg:mb-8">
              Ready to Accelerate Your
              <span className="block text-[#1453E6]">
                Digital Transformation?
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12">
              Join the organizations that trust SK Solution to
              modernize operations, automate processes, and build scalable
              Industry 4.0 solutions for the future.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-5">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#FF7F00] text-white font-semibold text-base sm:text-lg hover:shadow-xl hover:shadow-[#FF7F00]/30 transition-all duration-300 hover:-translate-y-1"
              >
                Book a Technical Audit
              </Link>

              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/20 bg-[#ffffff]/10 backdrop-blur-md text-white font-semibold text-base sm:text-lg hover:bg-[#ffffff]/20 transition-all duration-300"
              >
                View Our Portfolio
              </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-14 lg:mt-16 pt-8 sm:pt-10 lg:pt-12 border-t border-white/10">
              {[
                { value: "500+", label: "Projects Delivered" },
                { value: "100+", label: "Enterprise Clients" },
                { value: "20+", label: "Technology Experts" },
                { value: "15+", label: "Years Experience" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {value}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-1 sm:mt-2">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

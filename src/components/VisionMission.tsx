import React from "react";

const VisionMission: React.FC = () => {
  const items = [
    {
      title: "Our Vision",
      icon: "visibility",
      description:
        "To become a global technology partner empowering enterprises through innovation, digital transformation, Industry 4.0 solutions, and intelligent business ecosystems that drive sustainable growth.",
    },
    {
      title: "Our Mission",
      icon: "track_changes",
      description:
        "To deliver reliable, scalable, and future-ready ERP, IoT, Embedded Systems, Automation, and Software Solutions that help organizations optimize operations and achieve measurable business success.",
    },
  ];

  return (
    <section className="bg-[#F8FAFF] py-8 sm:py-4 lg:py-6 xl:py-10 overflow-hidden">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1453E6]/10 text-[#1453E6] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide">
            OUR PURPOSE
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#081D3A] mb-4 sm:mb-6 leading-tight">
            Vision & Mission
          </h2>

          <p className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
            Guided by innovation, driven by excellence, and committed to helping
            organizations embrace the future of technology.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden bg-[#ffffff] rounded-3xl sm:rounded-[36px] lg:rounded-[40px] p-7 sm:p-9 lg:p-12 border border-[#E6EDF9] shadow-[0_10px_40px_rgba(8,29,58,0.06)] hover:shadow-[0_20px_50px_rgba(20,83,230,0.12)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              {/* Background Glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#1453E6]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

              {/* Icon */}
              <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-[#1453E6]/10 flex items-center justify-center mb-5 sm:mb-6 lg:mb-8 flex-shrink-0">
                <span
                  className="material-symbols-outlined text-[#1453E6]"
                  style={{ fontSize: "clamp(26px, 3vw, 42px)" }}
                >
                  {item.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-2xl sm:text-3xl font-bold text-[#081D3A] mb-3 sm:mb-4 lg:mb-6 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-sm sm:text-base lg:text-lg text-slate-600 leading-7 sm:leading-8 lg:leading-9">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;

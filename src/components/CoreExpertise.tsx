import React from "react";

interface Expertise {
  title: string;
  description: string;
  icon: string;
  colSpan?: string;
  tags?: string[];
}

const expertiseData: Expertise[] = [
  {
    title: "ERP Systems",
    description:
      "Comprehensive enterprise resource planning solutions designed for manufacturing, education, banking, agriculture, and enterprise operations.",
    icon: "hub",
    colSpan: "sm:col-span-2 md:col-span-2",
    tags: ["IndustryNext™", "ERP", "Integration"],
  },
  {
    title: "Industrial IoT",
    description:
      "Connect machines, sensors, and assets with intelligent monitoring and real-time analytics.",
    icon: "sensors",
  },
  {
    title: "Industrial Automation",
    description:
      "Smart manufacturing systems and automated process control for Industry 4.0.",
    icon: "precision_manufacturing",
  },
  {
    title: "Smart Monitoring",
    description:
      "Real-time dashboards, predictive maintenance, and business intelligence systems.",
    icon: "monitoring",
    colSpan: "sm:col-span-2 md:col-span-2",
  },
  {
    title: "Embedded Systems",
    description:
      "Hardware, firmware, communication protocols, and embedded engineering solutions.",
    icon: "memory",
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Scalable cloud-native architecture with enterprise-grade security and reliability.",
    icon: "cloud",
  },
];

const CoreExpertise: React.FC = () => {
  return (
    <section className="bg-[#EEF3FB] sm:py-16 lg:py-20 xl:py-22 overflow-hidden">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-full lg:max-w-3xl">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1453E6]/10 text-[#1453E6] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide">
              CAPABILITIES
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#081D3A] leading-tight">
              Precision-Engineered Solutions
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              for the Enterprise
            </h2>
          </div>

          <span
            className="material-symbols-outlined text-[#1453E6]/20 hidden lg:block flex-shrink-0"
            style={{ fontSize: "80px" }}
          >
            engineering
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {expertiseData.map((item) => (
            <div
              key={item.title}
              className={`
                ${item.colSpan || ""}
                group
                bg-[#ffffff]
                border
                border-[#E6EDF9]
                rounded-2xl
                sm:rounded-[28px]
                lg:rounded-[32px]
                p-5
                sm:p-6
                lg:p-8
                hover:border-[#1453E6]
                hover:-translate-y-1
                sm:hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(20,83,230,0.12)]
                transition-all
                duration-500
                min-w-0
              `}
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-[#1453E6]/10 flex items-center justify-center mb-5 sm:mb-6 lg:mb-8 group-hover:bg-[#1453E6] transition-all duration-300 flex-shrink-0">
                <span
                  className="material-symbols-outlined text-[#1453E6] group-hover:text-white transition-all duration-300"
                  style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
                >
                  {item.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#081D3A] mb-2 sm:mb-3 lg:mb-4 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-7 mb-4 sm:mb-5 lg:mb-6">
                {item.description}
              </p>

              {/* Tags */}
              {item.tags && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-2.5
                        py-1
                        sm:px-3
                        sm:py-1.5
                        rounded-full
                        bg-[#EEF3FB]
                        text-[#1453E6]
                        text-[11px]
                        sm:text-xs
                        font-semibold
                        whitespace-nowrap
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Progress Bar for Smart Monitoring */}
              {item.title === "Smart Monitoring" && (
                <div className="mt-6 sm:mt-7 lg:mt-8">
                  <div className="w-full h-1.5 sm:h-2 bg-[#EEF3FB] rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-[#1453E6] rounded-full transition-all duration-1000 group-hover:w-full" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreExpertise;

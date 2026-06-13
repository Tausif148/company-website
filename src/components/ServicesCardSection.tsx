import React from "react";

interface Service {
  title: string;
  description: string;
  icon: string;
  variant: "dark" | "light" | "primary";
}

const services: Service[] = [
  {
    title: "Innovation Driven",
    description:
      "Strong R&D foundation focused on emerging technologies and future-ready digital solutions.",
    icon: "lightbulb",
    variant: "dark",
  },
  {
    title: "Industry Expertise",
    description:
      "Multi-industry experience across Manufacturing, Education, Healthcare, Energy and Logistics.",
    icon: "domain",
    variant: "light",
  },
  {
    title: "Scalable Solutions",
    description:
      "Growth-ready platforms designed to scale with your business while ensuring reliability.",
    icon: "trending_up",
    variant: "primary",
  },
  {
    title: "Long-Term Support",
    description:
      "Dedicated support team providing maintenance, monitoring and continuous optimization.",
    icon: "support_agent",
    variant: "dark",
  },
];

const cardStyles = {
  dark: {
    card: "bg-[#020B3A] text-white",
    desc: "text-white/70",
    iconBox: "bg-[#ffffff]/5 border border-white/10",
    icon: "text-[#3B82F6]",
  },
  light: {
    card: "bg-[#EEF1FF] text-[#081D3A]",
    desc: "text-slate-600",
    iconBox: "bg-[#ffffff]/30 border border-[#D9DDF5]",
    icon: "text-[#7C83E6]",
  },
  primary: {
    card: "bg-[#2950D4] text-white",
    desc: "text-white/70",
    iconBox: "bg-[#ffffff]/10 border border-white/10",
    icon: "text-white/70",
  },
};

const ServicesCardSection: React.FC = () => {
  return (
    <section className="bg-[#ffffff] py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 px-2">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1453E6]/10 text-[#1453E6] text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            WHY CHOOSE SK Solution
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#081D3A] leading-tight">
            Engineering Excellence That Scales
          </h2>

          <p className="max-w-3xl mx-auto mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-600">
            Delivering innovation, expertise and scalable technology solutions
            backed by long-term partnership and support.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
    flex sm:grid
    sm:grid-cols-2
    xl:grid-cols-4
    gap-5 sm:gap-6

    overflow-x-auto
    sm:overflow-visible

    snap-x snap-mandatory
    scrollbar-hide

    pb-2
    -mx-4 px-4
    sm:mx-0 sm:px-0
  "
        >
          {services.map((service) => {
            const style = cardStyles[service.variant];

            return (
              <div
                key={service.title}
                className={`
          group
          ${style.card}

          snap-center
          shrink-0
          w-[85vw]
          sm:w-auto

          rounded-[24px] sm:rounded-[28px] lg:rounded-[32px]
          p-6 sm:p-7 lg:p-8

          min-h-[380px]
          sm:min-h-[420px]
          lg:min-h-[480px]

          flex flex-col justify-between

          transition-all duration-500
          hover:-translate-y-2
          hover:shadow-2xl
        `}
              >
                {/* Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-5">
                    {service.title}
                  </h3>

                  <p
                    className={`${style.desc} text-sm sm:text-base lg:text-lg leading-7 sm:leading-8`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Icon Area */}
                <div
                  className={`
            ${style.iconBox}
            h-[130px] sm:h-[155px] lg:h-[180px]
            rounded-[20px] sm:rounded-[24px] lg:rounded-[28px]
            flex items-center justify-center
            backdrop-blur-sm
            transition-all duration-500
            group-hover:scale-[1.02]
            mt-6 sm:mt-0
          `}
                >
                  <span
                    className={`${style.icon} material-symbols-outlined`}
                    style={{
                      fontSize: "clamp(64px, 8vw, 100px)",
                      fontVariationSettings:
                        "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48",
                    }}
                  >
                    {service.icon}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesCardSection;

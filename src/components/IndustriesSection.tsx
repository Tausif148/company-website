import React from "react";

interface Industry {
  title: string;
  icon: string;
}

const industries: Industry[] = [
  { title: "Manufacturing", icon: "factory" },
  { title: "Healthcare", icon: "medical_services" },
  { title: "Logistics", icon: "local_shipping" },
  { title: "Energy", icon: "bolt" },
  { title: "Agriculture", icon: "agriculture" },
  { title: "Education", icon: "school" },
  { title: "Banking", icon: "account_balance" },
  { title: "Retail", icon: "storefront" },
  { title: "Automotive", icon: "directions_car" },
  { title: "Smart Infrastructure", icon: "apartment" },
];

const IndustriesSection: React.FC = () => {
  return (
    <section className="bg-[#F8FAFF] py-8 sm:py-4 lg:py-6 xl:py-10 overflow-hidden">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1453E6]/10 text-[#1453E6] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide">
            INDUSTRIES
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#081D3A] mb-4 sm:mb-6 leading-tight">
            Industries We Empower
          </h2>

          <p className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
            Delivering industry-focused ERP, IoT, Automation, Cloud, and
            Software Solutions that help organizations improve efficiency,
            innovation, and business growth.
          </p>
        </div>

        {/* Industry Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="group bg-[#ffffff] rounded-2xl sm:rounded-[24px] lg:rounded-[28px] border border-[#E6EDF9] p-5 sm:p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-[#1453E6] hover:shadow-[0_15px_40px_rgba(20,83,230,0.12)]"
            >
              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-[#1453E6]/10 flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:bg-[#1453E6] transition-all duration-300 flex-shrink-0">
                <span
                  className="material-symbols-outlined text-[#1453E6] group-hover:text-white transition-all duration-300"
                  style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
                >
                  {industry.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#081D3A] leading-5 sm:leading-6">
                {industry.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

import React from "react";

const CompanyOverview: React.FC = () => {
  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "100+", label: "Enterprise Clients" },
    { value: "20+", label: "Technology Experts" },
    { value: "15+", label: "Years Experience" },
  ];

  const highlights = [
    "Enterprise Resource Planning (ERP)",
    "Industrial IoT Solutions",
    "Embedded Systems Development",
    "Industry 4.0 Automation",
    "Cloud & Mobile Applications",
    "Custom Software Development",
  ];

  return (
    <>
      {/* ── Section 1: About ── */}
      <section className="bg-[#F8FAFF] py-8 sm:py-4 lg:py-6 xl:py-10 overflow-hidden">
        <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1453E6]/10 text-[#1453E6] text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                ABOUT SK Solution
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#081D3A] mb-6 sm:mb-8">
                Empowering Businesses Through Technology, Innovation &{" "}
                <span className="text-[#1453E6]">Digital Transformation</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-7 sm:leading-9 mb-5 sm:mb-8">
                SK Solution is a technology-driven company specializing
                in Enterprise Resource Planning (ERP) solutions, custom software
                development, Industrial IoT, embedded systems, mobile
                applications, cloud technologies, and Industry 4.0 digital
                transformation solutions.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-7 sm:leading-9 mb-8 sm:mb-10">
                We help organizations modernize operations, improve efficiency,
                automate business processes, and gain real-time visibility
                across their entire ecosystem through innovative software and
                industrial technology solutions.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 sm:gap-3">
                    <span className="material-symbols-outlined text-[#1453E6] text-[20px] sm:text-[24px] shrink-0">
                      check_circle
                    </span>
                    <span className="text-[#081D3A] font-medium text-sm sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="relative mt-4 lg:mt-0">
              {/* Main Card */}
              <div className="bg-[#EEF3FB] rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-5 sm:p-7 lg:p-10 shadow-xl">
                <div className="aspect-[4/3] rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] bg-gradient-to-br from-[#1453E6] to-[#081D3A] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: "clamp(80px, 12vw, 140px)" }}
                  >
                    business_center
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mt-5 sm:mt-6 lg:mt-8">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#ffffff] rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1453E6] mb-1 sm:mb-2">
                        {item.value}
                      </h3>
                      <p className="text-slate-600 font-medium text-xs sm:text-sm lg:text-base">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge — lg+ only, positioned safely */}
              <div className="absolute -top-5 -right-4 xl:-top-6 xl:-right-6 bg-[#ffffff] rounded-2xl xl:rounded-3xl px-4 py-3 xl:px-6 xl:py-4 shadow-xl hidden lg:flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1453E6] text-[20px] xl:text-[24px]">
                  workspace_premium
                </span>
                <div>
                  <p className="font-bold text-[#081D3A] text-sm xl:text-base">
                    Industry 4.0
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Technology Partner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Approach ── */}
      <section className="bg-[#F8FAFF] sm:py-4 lg:py-6 xl:py-10 overflow-hidden">
        <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 lg:mb-16 px-2">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1453E6]/10 text-[#1453E6] text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              OUR APPROACH
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#081D3A] mb-4 sm:mb-6 leading-tight">
              Technology Built Around Your Business
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-7 sm:leading-9">
              At SK Solution, we believe that every organization has
              unique operational challenges and growth objectives. Instead of
              offering one-size-fits-all solutions, we work closely with our
              clients to understand their business processes, identify
              opportunities for improvement, and design technology solutions
              that create measurable business value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                icon: "handshake",
                title: "Business Understanding",
                desc: "We analyze workflows, challenges, and operational goals before designing solutions.",
              },
              {
                icon: "settings",
                title: "Tailored Solutions",
                desc: "Every solution is customized to industry-specific requirements and long-term business goals.",
              },
              {
                icon: "trending_up",
                title: "Sustainable Growth",
                desc: "From development to deployment and support, we ensure measurable business impact.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-[#EEF3FB] rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8"
              >
                <span className="material-symbols-outlined text-[#1453E6] text-4xl sm:text-5xl mb-3 sm:mb-4 block">
                  {card.icon}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#081D3A] mb-3 sm:mb-4">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyOverview;

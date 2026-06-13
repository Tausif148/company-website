import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    company: "Global Freight Solutions",
    industry: "Logistics Industry",
    quote:
      "The industrial ERP integration reduced our operational latency by 40% in just six months. The BI tools are revolutionary.",
    value: "40%",
    label: "Efficiency Boost",
    icon: "local_shipping",
  },
  {
    company: "EduTrust Institute",
    industry: "Education Sector",
    quote:
      "Managing 50,000 students across 12 campuses became effortless with SK Solution. The automated fee system is flawless.",
    value: "12",
    label: "Campus Sync",
    icon: "school",
  },
  {
    company: "FinEdge Bank",
    industry: "Banking & Finance",
    quote:
      "Security and auditing were our top priorities. SK Solution delivered a platform that exceeds banking compliance standards.",
    value: "100%",
    label: "Compliance Audit",
    icon: "account_balance",
  },
  {
    company: "Global Freight Solutions",
    industry: "Logistics Industry",
    quote:
      "The industrial ERP integration reduced our operational latency by 40% in just six months. The BI tools are revolutionary.",
    value: "40%",
    label: "Efficiency Boost",
    icon: "local_shipping",
  },
  {
    company: "EduTrust Institute",
    industry: "Education Sector",
    quote:
      "Managing 50,000 students across 12 campuses became effortless with SK Solution. The automated fee system is flawless.",
    value: "12",
    label: "Campus Sync",
    icon: "school",
  },
  {
    company: "FinEdge Bank",
    industry: "Banking & Finance",
    quote:
      "Security and auditing were our top priorities. SK Solution delivered a platform that exceeds banking compliance standards.",
    value: "100%",
    label: "Compliance Audit",
    icon: "account_balance",
  },
];

const TestimonialSlider: React.FC = () => {
  return (
    <section className="bg-[#EEF3FB] py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 px-2">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1453E6]/10 text-[#1453E6] text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            SUCCESS STORIES
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#081D3A] tracking-tight">
            Engineered for Success
          </h2>

          <p className="max-w-3xl mx-auto mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Discover how organizations achieve measurable results through our
            ERP, IoT, Automation, Embedded Systems and Enterprise Software
            Solutions.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          centeredSlides
          slidesPerView="auto"
          spaceBetween={16}
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { spaceBetween: 20 },
            1024: { spaceBetween: 30 },
          }}
          className="testimonial-swiper !pb-0 sm:!pb-22 lg:!pb-24"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide
              key={`${item.company}-${index}`}
              className="!w-[92%] sm:!w-[80%] lg:!w-[65%]"
            >
              <div className="bg-[#ffffff] rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] border border-[#E6EDF9] p-5 sm:p-7 lg:p-10 shadow-[0_8px_30px_rgba(8,29,58,0.06)] min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] flex flex-col justify-between">
                {/* Company */}
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1453E6] to-[#081D3A] flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-white text-2xl sm:text-3xl">
                      {item.icon}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#081D3A] truncate">
                      {item.company}
                    </h3>
                    <p className="text-[#1453E6] text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider mt-0.5">
                      {item.industry}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-sm sm:text-base lg:text-lg italic text-slate-600 leading-7 sm:leading-8 mb-6 sm:mb-8 lg:mb-10">
                  "{item.quote}"
                </blockquote>

                {/* Result */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1453E6] shrink-0">
                    {item.value}
                  </span>
                  <span className="uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs font-bold text-slate-500 leading-tight">
                    {item.label}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSlider;

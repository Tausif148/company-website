import React from "react";
import { useReveal } from "../hooks/useReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Link } from "react-router-dom";
import { services } from "../data/serviceData";

const OurServicesSlider: React.FC = () => {
  useReveal();

  return (
    <section
      id="Solutions"
      className="bg-[#EEF3FB] py-16 sm:py-20 lg:py-24 xl:py-20 overflow-hidden"
    >
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16 lg:mb-20 reveal">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1453E6]/10 text-[#1453E6] text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            OUR EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#081D3A] tracking-tight px-2">
            Our Services{" "}
          </h2>
          <p className="max-w-3xl mx-auto mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed px-2">
            Delivering enterprise‑grade software, automation, IoT, embedded
            systems, and cloud solutions that empower digital transformation.
          </p>
        </div>

        {/* Slider */}
        <div className="relative reveal">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={16}
            slidesPerView={1}
            speed={800}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="OurServicesSlider-swiper !pb-14 sm:!pb-16"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.slug}>
                <div
                  className="group relative bg-[#ffffff] rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-6 lg:p-8
                    border border-[#E6EDF9]
                    shadow-[0_4px_20px_rgba(8,29,58,0.06)]
                    hover:shadow-[0_20px_50px_rgba(20,83,230,0.15)]
                    hover:-translate-y-2 sm:hover:-translate-y-3
                    transition-all duration-500 flex flex-col h-full min-h-[280px] sm:min-h-[300px] lg:min-h-[300px]"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  {/* Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1453E6] via-[#3D7CFF] to-[#1453E6] rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-3xl sm:rounded-tr-3xl" />

                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1453E6]/0 via-transparent to-[#1453E6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl" />

                  {/* Icon */}
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1453E6]/10 to-[#1453E6]/05 flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#1453E6]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-md sm:text-xl lg:text-md font-bold text-[#081D3A] mb-2 sm:mb-3 lg:mb-4 leading-tight truncate">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm sm:text-sm text-slate-600 leading-6 sm:leading-7 flex-grow overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="mt-5 sm:mt-6 lg:mt-8 flex items-center text-[#1453E6] font-semibold text-sm sm:text-sm  ">
                    <Link
                      to={`/services/${service.slug}`}
                      className="flex items-center "
                    >
                      Learn More
                      <span className="material-symbols-outlined ml-1.5 sm:ml-2 text-base sm:text-lg transition-transform duration-300 group-hover:translate-x-1 hover:none">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSlider;

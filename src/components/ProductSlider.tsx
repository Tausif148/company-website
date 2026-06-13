import React from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { products } from "../data/productData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductSlider: React.FC = () => {
  useReveal();

  return (
    <section className="bg-[#F7F8FC] py-12 sm:py-16 lg:py-20 xl:py-22 overflow-hidden" >
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 px-2 reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-bold text-[#081D3A] mb-3 sm:mb-4 leading-tight">
            IoT Edge Intelligence
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-[20px] text-slate-600 leading-relaxed">
            Advanced biometric and sensory hardware designed for seamless
            ecosystem integration.
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
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              480: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="iot-swiper !pb-14 sm:!pb-16"
          >
            {products.map((device, index) => (
              <SwiperSlide key={device.id}>
                <Link
                  to={`/products/${device.slug}`}
                  className="block h-full group"
                  aria-label={`View details for ${device.title}`}
                >
                  <div
                    className="w-full bg-[#ffffff] rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-5 sm:p-6 lg:p-8
                      shadow-[0_12px_30px_rgba(0,0,0,0.08)]
                      group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                      transition-all duration-300 h-full"
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    {/* Image Box */}
                    <div className="bg-[#EEF3FB] rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] p-4 sm:p-5 lg:p-6 mb-5 sm:mb-6 lg:mb-8">
                      <img
                        src={device.image}
                        alt={device.title}
                        className="w-full h-[180px] sm:h-[200px] lg:h-[220px] object-cover rounded-xl"
                      />
                    </div>

                    {/* Text */}
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-bold text-[#081D3A] mb-1.5 sm:mb-2">
                        {device.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] lg:text-[16px] text-slate-500 font-medium mb-4">
                        {device.subtitle}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB]
                          group-hover:gap-3 transition-all duration-200"
                      >
                        View Details
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;

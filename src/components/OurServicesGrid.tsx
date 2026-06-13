import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Import services data
import { services } from "../data/serviceData";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  slug: string;
  featured?: boolean;
}

// Map services to local type (icon already defined)
const servicesList: ServiceItem[] = services.map((s) => ({
  title: s.title,
  description: s.description,
  icon: s.icon,
  slug: s.slug,
  featured: false,
}));

const OurServicesGrid: React.FC = () => {
  return (
    <section className="bg-[#EEF3FB] py-10 sm:py-16 lg:py-20 xl:py-22 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16 xl:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
            Our Services
          </h2>
          <p className="max-w-xl sm:max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Enterprise‑grade digital products engineered for massive
            scalability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-[#ffffff] p-6 sm:p-7 lg:p-8 transition-all duration-500 hover:bg-[#081D3A] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(20,83,230,0.25)] flex flex-col h-full cursor-pointer ${service.featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-[#1453E6]/20 blur-3xl" />
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-4 sm:mb-5 lg:mb-6">
                  <Icon className="h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-[#1453E6] transition-colors duration-500 group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 transition-colors duration-500 group-hover:text-white leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-sm leading-relaxed text-slate-600 mb-5 sm:mb-6 lg:mb-8 transition-colors duration-500 group-hover:text-white/80">
                  {service.description}
                </p>

                {/* CTA */}
                <div className="relative z-10 mt-auto flex items-center text-[#1453E6] text-sm sm:text-base font-semibold transition-colors duration-500 group-hover:text-white">
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex items-center"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Border Effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-transparent group-hover:border-white/20 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServicesGrid;

import React from "react";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const MapSection: React.FC = () => {
  return (
    <section
      id="location"
      className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-50 overflow-hidden"
    >
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-14 px-2">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-100 text-[#1453E6] text-xs sm:text-sm font-semibold">
            Our Location
          </span>

          <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
            Visit Our Office
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Meet our experts in Pune and explore how SK Solution can
            help accelerate your digital transformation journey.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Contact Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#ffffff] rounded-2xl sm:rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 h-full flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">
                Pune Office
              </h3>
              <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8">
                We'd love to hear from you.
              </p>

              <div className="space-y-3 sm:space-y-5 lg:space-y-6">
                {/* Address */}
                <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#1453E6] sm:hidden" />
                    <MapPin
                      size={22}
                      className="text-[#1453E6] hidden sm:block"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                      Office Address
                    </h4>
                    <p className="text-slate-600 mt-0.5 sm:mt-1 text-xs sm:text-sm leading-relaxed">
                      Nagpur, Maharashtra, India
                      <br />
                      Hinjawadi IT Park
                      <br />
                      Pune - 411057
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#1453E6]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                      Phone
                    </h4>
                    <a
                      href="tel:+919876543210"
                      className="text-slate-600 hover:text-[#1453E6] text-xs sm:text-sm transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#1453E6]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                      Email
                    </h4>
                    <a
                      href="mailto:info@company.com"
                      className="text-slate-600 hover:text-[#1453E6] text-xs sm:text-sm transition-colors break-all"
                    >
                      info@company.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-[#1453E6]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-slate-900">
                      Working Hours
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      Monday - Friday
                      <br />
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://www.google.com/maps/place/Pune,+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 sm:mt-8 inline-flex items-center justify-center gap-2 w-full bg-[#1453E6] text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium hover:bg-blue-700 transition-all duration-300"
              >
                Get Directions
                <ArrowUpRight size={16} className="sm:hidden" />
                <ArrowUpRight size={18} className="hidden sm:block" />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl h-[300px] sm:h-[400px] md:h-[480px] lg:h-full lg:min-h-[560px]">
              <iframe
                title="Pune Office Location"
                src="https://maps.google.com/maps?q=Pune,Maharashtra,India&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

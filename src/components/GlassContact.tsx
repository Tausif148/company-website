const GlassContact = () => {
  return (
    <section className="bg-[#EEF3FB] py-12 sm:py-16 lg:py-20 xl:py-22 overflow-hidden">
      <div className="max-w-[1440px] sm:mt-0 mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[36px] lg:rounded-[40px] shadow-[0_20px_60px_rgba(8,29,58,0.08)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-min">

            {/* Left Content */}
            <div className="p-5 sm:p-8 md:p-12 lg:p-16 bg-[#081D3A] text-white flex flex-col justify-center">
              <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-6 w-fit">
                GET IN TOUCH
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-snug sm:leading-tight mb-3 sm:mb-4 md:mb-6">
                Ready to Transform Your Business?
              </h2>

              <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg leading-6 sm:leading-7 md:leading-8 mb-5 sm:mb-7 md:mb-10">
                Schedule a consultation with our experts and discover how ERP,
                IoT, Embedded Systems, Automation, and Cloud Solutions can
                accelerate your digital transformation.
              </p>

              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                {[
                  "Complimentary Infrastructure Audit",
                  "Personalized Implementation Roadmap",
                  "Enterprise Solution Consultation",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-[#1453E6] flex items-center justify-center text-xs sm:text-sm md:text-base flex-shrink-0 mt-0.5 sm:mt-0">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg pt-0.5 sm:pt-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="p-5 sm:p-8 md:p-12 lg:p-16">
              <form className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#081D3A] mb-1.5 sm:mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full h-10 sm:h-12 md:h-13 lg:h-14 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-gray-200 focus:border-[#1453E6] focus:ring-4 focus:ring-[#1453E6]/10 outline-none transition-all text-xs sm:text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#081D3A] mb-1.5 sm:mb-2">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full h-10 sm:h-12 md:h-13 lg:h-14 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-gray-200 focus:border-[#1453E6] focus:ring-4 focus:ring-[#1453E6]/10 outline-none transition-all text-xs sm:text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#081D3A] mb-1.5 sm:mb-2">
                    Industry
                  </label>
                  <select className="w-full h-10 sm:h-12 md:h-13 lg:h-14 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-gray-200 focus:border-[#1453E6] focus:ring-4 focus:ring-[#1453E6]/10 outline-none transition-all text-xs sm:text-sm md:text-base bg-white">
                    <option>Manufacturing</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Energy</option>
                    <option>Automotive</option>
                    <option>Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#081D3A] mb-1.5 sm:mb-2">
                    Project Requirement
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus:border-[#1453E6] focus:ring-4 focus:ring-[#1453E6]/10 outline-none transition-all resize-none text-xs sm:text-sm md:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-10 sm:h-12 md:h-13 lg:h-14 rounded-lg sm:rounded-xl bg-[#FF7F00] text-white text-xs sm:text-sm md:text-base font-semibold hover:bg-[#e67200] transition-all duration-300 shadow-lg active:scale-95 sm:active:scale-100"
                >
                  Schedule Consultation
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GlassContact;
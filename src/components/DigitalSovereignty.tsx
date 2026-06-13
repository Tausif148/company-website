const journeySteps = [
  { number: "01", title: "REQUIREMENT ANALYSIS" },
  { number: "02", title: "SOLUTION ARCHITECTURE" },
  { number: "03", title: "DESIGN & DEVELOPMENT" },
  { number: "04", title: "TESTING & VALIDATION" },
  { number: "05", title: "DEPLOYMENT" },
  { number: "06", title: "SUPPORT & MAINTENANCE" },
];

export default function DigitalSovereignty() {
  return (
    <section className="bg-[#EEF3FB] py-16 sm:py-10 lg:py-14 xl:py28 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-10 sm:mb-14 lg:mb-16">
          Premium Timeline
        </h2>

        {/* Timeline */}
        <div className="relative">

          {/* Dotted line — desktop only, aligned to circle centre (top-6 = 24px = half of w-12) */}
          <div className="hidden lg:block absolute top-6 left-[calc(100%/12)] right-[calc(100%/12)] border-t-[3px] border-dashed border-blue-700 z-0" />

          {/* Steps — mobile: 2 cols but last 2 centred; tablet: 3 cols even; desktop: 6 cols */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 sm:gap-6 lg:gap-4">
            {journeySteps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className="relative w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center text-base sm:text-lg font-bold shadow-md z-10 shrink-0">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base font-bold text-slate-900 leading-snug max-w-[120px] sm:max-w-[140px] lg:max-w-[150px]">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
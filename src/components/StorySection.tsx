import { useEffect, useState } from "react";

const slides = [
  {
    title: "Inventory Intelligence",
    description:
      "Track every SKU across global warehouses in real-time. Automated reordering and demand forecasting powered by SK Solution AI.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDu4zabv1nQEAEtgUr_Y_tsGt2BPsedo6-pBJZju1mupEiMd2nkHH6jNw2wxAAHlAF9H9ySFMg6FWWumbRG7A63gN9rgKqn0xiLmoY5A5osq3E8KRPTnGgQ-I8JZRzS5ZN9A11AF1FsNVfCE92pS8CdZsm4zDpOuzMrzX1Ek2qGUgjq6YqGBtOVNGDIbhlCfRcl4QqBGB1FkTJXDHZLRM_uNReQJUv-2kKKl4skTOf6IqEofTGB9nHPvM0QQFNCwxTgGYQIRtckmXs",
  },
  {
    title: "Energy Dynamics",
    description:
      "Monitor carbon footprint and energy consumption spikes. Receive automated suggestions for peak-load shifting.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
  },
  {
    title: "Human Resource Hub",
    description:
      "Predict employee turnover and manage talent development cycles through integrated performance analytics.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
];

const StorySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("story-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        Math.max(-rect.top / (rect.height - window.innerHeight), 0),
        1,
      );

      const index = Math.min(
        slides.length - 1,
        Math.floor(progress * slides.length),
      );

      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="story-section" className="relative h-[300vh] bg-[#020B4A]">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-16">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${activeIndex === index ? "opacity-100" : "opacity-30"
                    }`}
                >
                  <h3 className="text-white text-[36px] font-bold mb-4">
                    {slide.title}
                  </h3>

                  <p className="text-white/80 text-[18px] leading-relaxed max-w-xl">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="bg-[#071454] border border-white/10 rounded-[36px] p-6 shadow-2xl">
                <img
                  src={slides[activeIndex].image}
                  alt={slides[activeIndex].title}
                  className="w-full h-[600px] object-cover rounded-3xl transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

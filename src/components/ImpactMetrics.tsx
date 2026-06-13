import { useEffect, useRef, useState } from "react";

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const metrics: Metric[] = [
  {
    value: 15,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    value: 100,
    suffix: "+",
    label: "Enterprise Clients",
  },
  {
    value: 20,
    suffix: "+",
    label: "Technology Experts",
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix,
  trigger,
}: {
  target: number;
  suffix: string;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const ImpactMetrics = () => {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMetricsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (metricsRef.current) observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#1453E6] py-10 sm:py-4 lg:py-6 xl:py-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div
          ref={metricsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6"
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center"
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              {/* Metric Value */}
              <h3 className="text-white font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl">
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  trigger={metricsVisible}
                />
              </h3>

              {/* Metric Label */}
              <p className="mt-4 text-xs md:text-sm uppercase tracking-[0.25em] text-white">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;

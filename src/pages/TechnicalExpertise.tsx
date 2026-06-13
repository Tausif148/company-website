import { useState, useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface CardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

interface TechBadgeProps {
  name: string;
  icon: string;
}

// ── Scroll-reveal hook ─────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Section heading ────────────────────────────────────────────────────────
const SectionHeading = ({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <span
        className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4"
        style={{ background: "rgba(255,127,0,0.12)", color: "#FF7F00" }}
      >
        {label}
      </span>
      <h2
        className="text-3xl md:text-4xl font-extrabold mb-4"
        style={{ color: "#081D3A" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="max-w-2xl mx-auto text-base md:text-lg"
          style={{ color: "#4A5568" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// ── Expertise card ─────────────────────────────────────────────────────────
const ExpertiseCard = ({ icon, title, description, delay = 0 }: CardProps) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        borderTop: "3px solid transparent",
      }}
      className={`group relative bg-white rounded-2xl p-6 shadow-sm cursor-default
        transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      onMouseEnter={(e) => (e.currentTarget.style.borderTopColor = "#FF7F00")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderTopColor = "transparent")
      }
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: "rgba(8,29,58,0.06)" }}
      >
        {icon}
      </div>
      <h3 className="font-bold text-base mb-2" style={{ color: "#081D3A" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
        {description}
      </p>
      <div
        className="absolute bottom-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ background: "rgba(255,127,0,0.3)" }}
      />
    </div>
  );
};

// ── Tech badge ─────────────────────────────────────────────────────────────
const TechBadge = ({ name, icon }: TechBadgeProps) => (
  <div
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default"
    style={{ color: "#081D3A" }}
  >
    <span>{icon}</span>
    <span>{name}</span>
  </div>
);

// ── Tech category card ────────────────────────────────────────────────────
const TechCategory = ({
  category,
  color,
  items,
  delay = 0,
}: {
  category: string;
  color: string;
  items: TechBadgeProps[];
  delay?: number;
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        borderLeft: `4px solid ${color}`,
      }}
      className={`bg-white rounded-2xl p-6 shadow-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <h3
        className="font-extrabold text-sm uppercase tracking-widest mb-5"
        style={{ color }}
      >
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((tech) => (
          <TechBadge key={tech.name} {...tech} />
        ))}
      </div>
    </div>
  );
};

// ── Data ──────────────────────────────────────────────────────────────────
const expertise = [
  {
    icon: "🎨",
    title: "Frontend Development",
    description:
      "Pixel-perfect, performant UIs with React, Next.js, and TypeScript that delight users on every device.",
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    description:
      "Robust, scalable APIs and microservices built with Node.js, Python, and Go for mission-critical systems.",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description:
      "Cross-platform iOS & Android apps using React Native and Flutter that feel fully native.",
  },
  {
    icon: "☁️",
    title: "Cloud Computing",
    description:
      "Architecture and migration on AWS, Azure, and GCP—designed for resilience and cost-efficiency.",
  },
  {
    icon: "🔄",
    title: "DevOps & CI/CD",
    description:
      "End-to-end automation pipelines, container orchestration with Kubernetes, and infrastructure as code.",
  },
  {
    icon: "🤖",
    title: "Artificial Intelligence",
    description:
      "Production-grade AI systems using LLMs, RAG pipelines, and fine-tuning tailored to your domain.",
  },
  {
    icon: "🧠",
    title: "Machine Learning",
    description:
      "Custom ML models—classification, regression, forecasting—from prototype to deployed inference endpoint.",
  },
  {
    icon: "📊",
    title: "Data Analytics",
    description:
      "Real-time dashboards, ETL pipelines, and warehouse solutions turning raw data into strategic insight.",
  },
  {
    icon: "🔌",
    title: "IoT Solutions",
    description:
      "Edge-to-cloud IoT platforms connecting devices, sensors, and dashboards for industrial and consumer use.",
  },
  {
    icon: "🖥️",
    title: "Embedded Systems",
    description:
      "Low-level firmware and real-time OS development for constrained hardware with strict reliability requirements.",
  },
  {
    icon: "🏭",
    title: "Industrial Automation",
    description:
      "PLC programming, SCADA systems, and smart factory integrations that modernize manufacturing floors.",
  },
  {
    icon: "🔒",
    title: "Cyber Security",
    description:
      "Threat modelling, penetration testing, secure SDLC practices, and SOC-2 readiness for regulated industries.",
  },
];

const techStack: {
  category: string;
  color: string;
  items: TechBadgeProps[];
}[] = [
    {
      category: "Frontend",
      color: "#3B82F6",
      items: [
        { name: "React", icon: "⚛️" },
        { name: "TypeScript", icon: "🔷" },
        { name: "JavaScript", icon: "🟡" },
        { name: "Next.js", icon: "▲" },
        { name: "Tailwind CSS", icon: "🎨" },
      ],
    },
    {
      category: "Backend",
      color: "#10B981",
      items: [
        { name: "Node.js", icon: "🟢" },
        { name: "Python", icon: "🐍" },
        { name: "Go", icon: "🐹" },
        { name: "GraphQL", icon: "◈" },
        { name: "REST APIs", icon: "🔗" },
      ],
    },
    {
      category: "Cloud & DevOps",
      color: "#8B5CF6",
      items: [
        { name: "AWS", icon: "☁️" },
        { name: "Docker", icon: "🐳" },
        { name: "Kubernetes", icon: "⎈" },
        { name: "Terraform", icon: "🏗️" },
        { name: "CI/CD", icon: "🔄" },
      ],
    },
    {
      category: "Data & AI",
      color: "#F59E0B",
      items: [
        { name: "PyTorch", icon: "🔥" },
        { name: "TensorFlow", icon: "🧮" },
        { name: "Pandas", icon: "🐼" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Redis", icon: "🔴" },
      ],
    },
  ];

const stats = [
  { value: "12+", label: "Years of expertise" },
  { value: "200+", label: "Projects delivered" },
  { value: "50+", label: "Technologies mastered" },
  { value: "98%", label: "Client satisfaction" },
];

// ── Main component ────────────────────────────────────────────────────────
const TechnicalExpertise = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative bg-[#F9FAFB]">
      {/* ── Hero ── */}
      <section
        className="relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 pt-24 pb-0"
        style={{ background: "#081D3A" }}
      >
        {/* Background geometry */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #FF7F00, transparent)",
            }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, #3B82F6, transparent)",
            }}
          />
          {/* Grid lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center py-16 md:py-20">
          <div
            ref={heroRef}
            className={`transition-all duration-800 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(255,127,0,0.15)", color: "#FF7F00" }}
            >
              Technical Expertise
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              style={{ color: "#fff" }}
            >
              Engineering the <span style={{ color: "#FF7F00" }}>Future,</span>
              <br />
              One Stack at a Time
            </h1>
            <p
              className="text-base md:text-lg mb-8 max-w-lg"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              From embedded firmware to cloud-native AI, our engineers operate
              at every layer of the technology stack — delivering precision,
              scale, and security for enterprise products that last.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#explore"
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: "#FF7F00", color: "#fff" }}
              >
                Explore Our Work →
              </a>

            </div>
          </div>

          {/* Hero illustration */}
          <div
            className={`hidden md:flex items-center justify-center transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="relative w-80 h-80">
              {/* Orbiting rings */}
              <div
                className="absolute inset-0 rounded-full border opacity-20 animate-spin"
                style={{ borderColor: "#FF7F00", animationDuration: "20s" }}
              />
              <div
                className="absolute inset-6 rounded-full border opacity-10 animate-spin"
                style={{
                  borderColor: "#3B82F6",
                  animationDuration: "15s",
                  animationDirection: "reverse",
                }}
              />
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl shadow-2xl"
                  style={{
                    background: "rgba(255,127,0,0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,127,0,0.3)",
                  }}
                >
                  💻
                </div>
              </div>
              {/* Floating badges */}
              {[
                { top: "4%", left: "60%", label: "AI / ML", icon: "🤖" },
                { top: "50%", left: "2%", label: "Cloud", icon: "☁️" },
                { top: "80%", left: "55%", label: "IoT", icon: "🔌" },
                { top: "20%", left: "5%", label: "Security", icon: "🔒" },
              ].map(({ top, left, label, icon }) => (
                <div
                  key={label}
                  className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    top,
                    left,
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-extrabold"
                  style={{ color: "#FF7F00" }}
                >
                  {value}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="explore">
        {/* ── Core expertise grid ── */}
        <section className="py-16 md:py-14">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              label="What We Build"
              title="Core Technology Expertise"
              subtitle="Twelve disciplines, one team. We go deep on each so you don't have to coordinate a dozen agencies."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {expertise.map((item, i) => (
                <ExpertiseCard
                  key={item.title}
                  {...item}
                  delay={Math.min(i * 50, 400)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech stack ── */}
        <section className="py-16 md:py-14" style={{ background: "#fff" }}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              label="Our Toolkit"
              title="Technology Stack"
              subtitle="We choose the right tool for the job—and we're expert in all of them."
            />
            <div className="grid md:grid-cols-2 gap-8">
              {techStack.map((stack, ci) => (
                <TechCategory key={stack.category} {...stack} delay={ci * 100} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TechnicalExpertise;

import { useState, useEffect, useRef } from "react";
// ─── Data ──────────────────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    id: 1,
    tag: "IoT & Connectivity",
    industry: "Manufacturing",
    title:
      "Real-time factory floor visibility for a Tier-1 auto parts supplier",
    summary:
      "A 3,000-employee manufacturer was flying blind — no live equipment telemetry, no predictive maintenance, and 14% unplanned downtime. We built an IoT data pipeline connecting 420 machines to a custom operations dashboard.",
    challenge:
      "Legacy PLCs with no network capability, siloed SCADA systems, and a 6-month hard deadline before a major OEM audit.",
    solution:
      "Edge gateways on each production line, MQTT broker middleware, a time-series data store, and a React-based ops console with alert routing to WhatsApp and email.",
    metrics: [
      { label: "Downtime Reduction", value: 67, unit: "%" },
      { label: "OEE Improvement", value: 22, unit: "%" },
      { label: "Machines Connected", value: 420, unit: "" },
    ],
    duration: "5 months",
    team: "6 engineers",
    featured: true,
    accentIdx: 0,
  },
  {
    id: 2,
    tag: "Digital Twin",
    industry: "Infrastructure",
    title: "Digital twin for a 42-km urban water distribution network",
    summary:
      "A municipal utility needed to reduce non-revenue water loss from 31% to below 15%, cut emergency repair costs, and comply with new national reporting mandates — all within two fiscal years.",
    challenge:
      "No unified asset registry, 30-year-old pipe records on paper, and a field team using disconnected spreadsheets.",
    solution:
      "GIS-integrated digital twin built on a graph database, real-time pressure sensor feeds, and an anomaly detection model that flags leaks before they surface.",
    metrics: [
      { label: "NRW Loss Reduced", value: 18, unit: "pp" },
      { label: "Emergency Callouts", value: 44, unit: "% ↓" },
      { label: "Assets Digitized", value: 12400, unit: "" },
    ],
    duration: "8 months",
    team: "9 engineers",
    featured: true,
    accentIdx: 1,
  },
  {
    id: 3,
    tag: "Enterprise Platform",
    industry: "Logistics",
    title: "Last-mile delivery intelligence platform for a pan-India courier",
    summary:
      "Manual route planning was costing a 2,000-vehicle fleet an estimated ₹4.2 Cr/month in fuel and idle time. We replaced spreadsheet dispatch with a route-optimization engine and driver app.",
    challenge:
      "No route API integrations, offline-first mobile requirement for poor-connectivity zones, and drivers skeptical of any new app.",
    solution:
      "Kotlin Android app with offline sync, a Node.js optimization service using OR-Tools, and a dispatcher console with live vehicle tracking.",
    metrics: [
      { label: "Fuel Cost Saving", value: 23, unit: "%" },
      { label: "On-time Rate", value: 91, unit: "%" },
      { label: "Vehicles Tracked", value: 2000, unit: "+" },
    ],
    duration: "6 months",
    team: "7 engineers",
    featured: false,
    accentIdx: 0,
  },
  {
    id: 4,
    tag: "Cloud Migration",
    industry: "Healthcare",
    title: "ABDM-compliant health records platform for a 12-hospital chain",
    summary:
      "Fragmented patient records across 12 facilities meant doctors had zero continuity of care data. The group needed a unified EMR that complied with India's Ayushman Bharat Digital Mission standards.",
    challenge:
      "HIPAA-level data sensitivity, 11 different legacy HIS systems, and a mandate to go live before the accreditation window closed.",
    solution:
      "HL7 FHIR APIs, a microservices backend on AWS, role-based access with audit logging, and a clinician-facing web app designed with 40 hours of user research.",
    metrics: [
      { label: "Records Unified", value: 1.4, unit: "M" },
      { label: "Query Time", value: 94, unit: "% faster" },
      { label: "Hospitals Live", value: 12, unit: "" },
    ],
    duration: "10 months",
    team: "11 engineers",
    featured: false,
    accentIdx: 1,
  },
  {
    id: 5,
    tag: "Mobile & IoT",
    industry: "Agriculture",
    title: "Precision irrigation control for a 6,000-acre grape estate",
    summary:
      "Manual irrigation scheduling was wasting 35% of water and causing inconsistent fruit quality that hit export grades. The estate needed sensor-driven automation they could operate from their phones.",
    challenge:
      "No cellular coverage in 60% of the fields, a non-technical operations team, and strict export certification timelines.",
    solution:
      "LoRaWAN mesh sensor network, a soil-moisture prediction model, automated valve controllers, and a WhatsApp-native alert bot alongside a simple mobile app.",
    metrics: [
      { label: "Water Saved", value: 31, unit: "%" },
      { label: "Export Grade Yield", value: 19, unit: "% ↑" },
      { label: "Sensors Deployed", value: 340, unit: "" },
    ],
    duration: "4 months",
    team: "5 engineers",
    featured: false,
    accentIdx: 0,
  },
  {
    id: 6,
    tag: "Enterprise Platform",
    industry: "Retail",
    title: "Unified inventory intelligence for a 280-store specialty retailer",
    summary:
      "Out-of-stock events were costing an estimated ₹18 Cr/year in lost sales. The retailer's warehouse and POS systems had never talked to each other in real time.",
    challenge:
      "Four different POS vendors, two ERP systems running in parallel, and a seasonal business that peaks sharply for 6 weeks a year.",
    solution:
      "Real-time event streaming with Kafka, a demand forecasting model trained on 5 years of transaction history, and an API layer that unified all four POS vendors.",
    metrics: [
      { label: "Stockout Events", value: 58, unit: "% ↓" },
      { label: "Inventory Turns", value: 2.3, unit: "x more" },
      { label: "Stores Connected", value: 280, unit: "" },
    ],
    duration: "7 months",
    team: "8 engineers",
    featured: false,
    accentIdx: 1,
  },
];

const TAGS = ["All", "Enterprise Platform", "Cloud Migration", "Mobile & IoT"];

const GLOBAL_STATS = [
  { value: "300+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Industries Served" },
  { value: "₹240Cr+", label: "Client Value Unlocked" },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

// ─── Primitives ────────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
      style={{
        color: "#FF7F00",
        borderColor: "#FF7F0040",
        backgroundColor: "#FF7F0012",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "#FF7F00" }}
      />
      {children}
    </span>
  );
}

// ─── Metric Bar ────────────────────────────────────────────────────────────────
function MetricBar({
  label,
  value,
  unit,
  visible,
}: {
  label: string;
  value: number;
  unit: string;
  visible: boolean;
}) {
  // Normalize to a width percent for the bar (cap at 100)
  const pct = typeof value === "number" && value <= 100 ? value : 75;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span
          className="text-xs font-semibold"
          style={{ color: "rgba(8,29,58,0.55)" }}
        >
          {label}
        </span>
        <span className="text-sm font-black" style={{ color: "#081D3A" }}>
          {value}
          {unit}
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "rgba(8,29,58,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            backgroundColor: "#FF7F00",
            width: visible ? `${pct}%` : "0%",
          }}
        />
      </div>
    </div>
  );
}

// ─── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({ study }: { study: (typeof CASE_STUDIES)[0] }) {
  const { ref, visible } = useInView(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-3xl border bg-[#ffffff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(8,29,58,0.12)]"
      style={{
        borderColor: "rgba(8,29,58,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition:
          "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Orange top bar */}
      <div
        className="h-1 w-full"
        style={{ background: "linear-gradient(90deg,#FF7F00,#ffb347)" }}
      />

      <div className="p-8">
        {/* Tags row */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-xs font-bold"
            style={{
              backgroundColor: "rgba(255,127,0,0.1)",
              color: "#FF7F00",
              border: "1px solid rgba(255,127,0,0.2)",
            }}
          >
            {study.tag}
          </span>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: "rgba(8,29,58,0.05)",
              color: "rgba(8,29,58,0.55)",
              border: "1px solid rgba(8,29,58,0.08)",
            }}
          >
            {study.industry}
          </span>
          <span
            className="ml-auto text-xs"
            style={{ color: "rgba(8,29,58,0.35)" }}
          >
            {study.duration} · {study.team}
          </span>
        </div>

        {/* Title */}
        <h2
          className="mb-4 text-2xl font-black leading-snug"
          style={{ color: "#081D3A" }}
        >
          {study.title}
        </h2>
        <p
          className="mb-6 text-sm leading-relaxed"
          style={{ color: "rgba(8,29,58,0.6)" }}
        >
          {study.summary}
        </p>

        {/* Challenge / Solution */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Challenge", text: study.challenge },
            { label: "Solution", text: study.solution },
          ].map(({ label, text }) => (
            <div
              key={label}
              className="rounded-2xl p-4"
              style={{ backgroundColor: "#EEF3FB" }}
            >
              <div
                className="mb-1.5 text-[10px] font-black uppercase tracking-[0.12em]"
                style={{ color: "#FF7F00" }}
              >
                {label}
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(8,29,58,0.65)" }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          {study.metrics.map((m) => (
            <MetricBar key={m.label} {...m} visible={hovered || visible} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Small Card ────────────────────────────────────────────────────────────────
function SmallCard({
  study,
  delay,
}: {
  study: (typeof CASE_STUDIES)[0];
  delay: number;
}) {
  const { ref, visible } = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border bg-[#ffffff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(8,29,58,0.1)] flex flex-col"
      style={{
        borderColor: "rgba(8,29,58,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ${delay}ms ease, transform 0.7s ${delay}ms ease, box-shadow 0.3s ease`,
      }}
    >
      {/* Orange left accent */}
      <div
        className="absolute left-0 top-0 h-full rounded-l-2xl transition-all duration-300"
        style={{ width: hovered ? 3 : 0, backgroundColor: "#FF7F00" }}
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
            style={{
              backgroundColor: "rgba(255,127,0,0.1)",
              color: "#FF7F00",
              border: "1px solid rgba(255,127,0,0.2)",
            }}
          >
            {study.tag}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
            style={{
              backgroundColor: "rgba(8,29,58,0.05)",
              color: "rgba(8,29,58,0.5)",
            }}
          >
            {study.industry}
          </span>
        </div>

        <h3
          className="mb-3 text-base font-black leading-snug transition-colors group-hover:text-[#FF7F00]"
          style={{ color: "#081D3A" }}
        >
          {study.title}
        </h3>
        <p
          className="mb-5 flex-1 text-xs leading-relaxed"
          style={{ color: "rgba(8,29,58,0.58)" }}
        >
          {study.summary}
        </p>

        {/* Metrics strip */}
        <div className="mb-4 space-y-2.5">
          {study.metrics.map((m) => (
            <MetricBar key={m.label} {...m} visible={hovered || visible} />
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between border-t pt-4 text-xs"
          style={{
            borderColor: "rgba(8,29,58,0.06)",
            color: "rgba(8,29,58,0.4)",
          }}
        >
          <span>
            {study.duration} · {study.team}
          </span>
          <span
            className="font-bold transition-colors group-hover:text-[#FF7F00]"
            style={{ color: "rgba(8,29,58,0.35)" }}
          >
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
const CaseStudies = () => {
  const [activeTag, setActiveTag] = useState("All");

  const featured = CASE_STUDIES.filter((s) => s.featured);
  const rest = CASE_STUDIES.filter((s) => !s.featured);

  const filtered =
    activeTag === "All" ? rest : rest.filter((s) => s.tag === activeTag);

  return (
    <div
      style={{ backgroundColor: "#EEF3FB" }}
      className="min-h-screen font-sans antialiased"
    >
      {/* ── Hero ── */}
      <section
        style={{ backgroundColor: "#081D3A" }}
        className="relative isolate overflow-hidden px-6 pb-20 pt-24 md:px-12 lg:px-24"
      >
        {/* Grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle,#FF7F00,transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-5 flex justify-center">
              <Eyebrow>Client Work</Eyebrow>
            </div>
            <h1 className="mb-5 text-center text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl">
              Problems solved.
              <br />
              <span style={{ color: "#FF7F00" }}>Results measured.</span>
            </h1>
            <p
              className="mx-auto mb-12 max-w-xl text-center text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Every engagement starts with a specific business problem. Here's
              how we worked through six of them — and what the numbers looked
              like after.
            </p>
          </Reveal>

          {/* Stats strip */}
          <Reveal delay={100}>
            <div
              className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              {GLOBAL_STATS.map((s) => (
                <div
                  key={s.label}
                  className="px-6 py-5 text-center"
                  style={{ backgroundColor: "#0e2545" }}
                >
                  <div className="text-2xl font-black text-white">
                    {s.value}
                  </div>
                  <div
                    className="mt-0.5 text-[11px]"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured ── */}
      <section 
        className="p-4 py-6 sm:px-6 md:px-12 lg:px-24 sm:py-12"
      
      
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-3 flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "rgba(8,29,58,0.1)" }}
              />
              <span
                className="text-[11px] font-black uppercase tracking-[0.16em]"
                style={{ color: "rgba(8,29,58,0.35)" }}
              >
                Featured Work
              </span>
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "rgba(8,29,58,0.1)" }}
              />
            </div>
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {featured.map((s) => (
              <FeaturedCard key={s.id} study={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section
        style={{ backgroundColor: "#081D3A" }}
        className="p-4 py-6 sm:px-6 md:px-12 lg:px-24 sm:py-12"
      >
        <div className="mx-auto">
          <div className=" grid gap-6 lg:grid-cols-2">
            <Reveal>
              <h2 className="mb-2 text-3xl font-black tracking-tight text-white md:text-4xl">
                More case studies
              </h2>
              <p
                className="mb-8 text-base"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Filter by practice area to find work most relevant to your
                industry.
              </p>
            </Reveal>

            {/* Filter tabs */}
            <Reveal delay={60}>
              <div className="mb-8 flex flex-wrap gap-2 justify-start lg:justify-end">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className="rounded-xl px-4 py-2 text-xs font-bold transition-all duration-150"
                    style={
                      activeTag === tag
                        ? { backgroundColor: "#FF7F00", color: "#fff" }
                        : {
                          backgroundColor: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.55)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
          {filtered.length === 0 ? (
            <p
              className="py-16 text-center text-sm"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              No case studies in this category yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((s, i) => (
                <SmallCard key={s.id} study={s} delay={i * 60} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Outcomes band ── */}
      <section
        style={{ backgroundColor: "#EEF3FB" }}
        className="p-4 py-6 sm:px-6 md:px-12 lg:px-24 sm:py-12"
      >
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-4 flex justify-center">
              <Eyebrow>Across All Engagements</Eyebrow>
            </div>
            <h2
              className="mb-12 text-center text-3xl font-black tracking-tight md:text-4xl"
              style={{ color: "#081D3A" }}
            >
              The pattern across every project:
              <span style={{ color: "#FF7F00" }}> outcomes over output.</span>
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🔬",
                title: "Start with the problem",
                desc: "Every engagement begins with a structured discovery sprint — no assumptions, no pre-sold solutions.",
              },
              {
                icon: "📐",
                title: "Design for the real constraint",
                desc: "Legacy systems, offline environments, non-technical users. We design for what's actually there, not what would be ideal.",
              },
              {
                icon: "📊",
                title: "Agree on the measure",
                desc: "Before writing a line of code, we define the KPI that will tell both sides whether the project succeeded.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div
                  className="group rounded-2xl border bg-[#ffffff] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(8,29,58,0.08)] relative overflow-hidden"
                  style={{ borderColor: "rgba(8,29,58,0.07)" }}
                >
                  <div
                    className="absolute left-0 top-0 h-full w-0 rounded-l-2xl transition-all duration-300 group-hover:w-[3px]"
                    style={{ backgroundColor: "#FF7F00" }}
                  />
                  <div className="mb-4 text-2xl">{item.icon}</div>
                  <h3 className="mb-2 font-black" style={{ color: "#081D3A" }}>
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(8,29,58,0.55)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;

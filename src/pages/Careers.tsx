import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type RefObject,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import type { CareerJob, ApplicationForm } from "src/types/careers.types";
// ─── Data ─────────────────────────────────────────────────────────────────────
const JOBS: CareerJob[] = [
  {
    id: 1,
    title: "React Frontend Developer",
    department: "Engineering",
    location: "Nagpur / Remote",
    type: "Full-time",
    experience: "2–4 yrs",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    location: "Nagpur / Hybrid",
    type: "Full-time",
    experience: "3–5 yrs",
    tags: ["Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: 3,
    title: "Android Developer",
    department: "Mobile",
    location: "Nagpur",
    type: "Full-time",
    experience: "2–4 yrs",
    tags: ["Kotlin", "Jetpack Compose", "Firebase"],
  },
  {
    id: 4,
    title: "Internship – Software Development",
    department: "Engineering",
    location: "Nagpur",
    type: "Internship",
    experience: "Fresher",
    tags: ["Any Stack", "Learning", "Mentored"],
  },
  {
    id: 5,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "2–3 yrs",
    tags: ["Figma", "Design Systems", "Research"],
  },
  {
    id: 6,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Nagpur / Remote",
    type: "Full-time",
    experience: "3–5 yrs",
    tags: ["Docker", "Kubernetes", "CI/CD"],
  },
];

const DEPARTMENTS = [
  "All",
  "Engineering",
  "Mobile",
  "Design",
  "Infrastructure",
];

const FAQS = [
  {
    q: "How long does the hiring process take?",
    a: "Typically 2–3 weeks from application to offer. We respect your time and keep every step transparent with clear timelines communicated upfront.",
  },
  {
    q: "Do you offer remote or hybrid work?",
    a: "Most roles offer hybrid or fully remote flexibility. Specific arrangements are listed per role and discussed during the offer stage.",
  },
  {
    q: "Is there a probation period?",
    a: "Yes, a standard 3-month probation period applies, during which you'll receive structured mentorship and bi-weekly check-ins.",
  },
  {
    q: "What does the technical interview look like?",
    a: "It's a 60-minute practical session — no whiteboard algorithms. Expect a real-world problem relevant to your role, and a collaborative discussion around your solution.",
  },
  {
    q: "Do you hire freshers or interns?",
    a: "Absolutely. Our internship program is a genuine path to full-time roles, with dedicated mentors and meaningful project work from week one.",
  },
];

const STATS = [
  { value: "120+", label: "Team Members" },
  { value: "300+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Countries Reached" },
];

const PROCESS = [
  {
    title: "Apply",
    desc: "Submit your application with resume and portfolio links.",
  },
  {
    title: "Screening",
    desc: "A 30-min call with our talent team to align on expectations.",
  },
  {
    title: "Technical Round",
    desc: "Practical, role-specific problem — no trick questions.",
  },
  {
    title: "Final Interview",
    desc: "Meet the team leads. We assess culture fit both ways.",
  },
  {
    title: "Offer",
    desc: "Clear, fast offer with full breakdown. You decide.",
  },
];

const CULTURE_CARDS = [
  {
    label: "Engineering Culture",
    desc: "Weekly tech talks, open RFC process, and engineers who own the architecture decisions.",
    color: "#FF7F00",
  },
  {
    label: "Maker Fridays",
    desc: "Every Friday afternoon is yours to explore, prototype, or contribute to open source.",
    color: "#081D3A",
  },
  {
    label: "Team Retreats",
    desc: "Annual team offsite — last year we built a hackathon project that became a product feature.",
    color: "#FF7F00",
  },
  {
    label: "Inclusive by Design",
    desc: "Hiring across India and globally, with accessibility and diversity reviewed at every step.",
    color: "#081D3A",
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
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

// ─── Primitives ────────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        color: "#FF7F00",
        borderColor: "#FF7F0040",
        backgroundColor: "#FF7F0012",
      }}
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
    >
      <span
        style={{ backgroundColor: "#FF7F00" }}
        className="h-1.5 w-1.5 rounded-full"
      />
      {children}
    </span>
  );
}

function OrangeBtn({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: "#FF7F00", color: "#fff" }}
      className={`rounded-xl px-6 py-3 text-sm font-bold tracking-tight transition-all duration-200 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(255,127,0,0.35)] active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Sections ──────────────────────────────────────────────────────────────────
function Navbar({ onScrollToJobs }: { onScrollToJobs: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        backgroundColor: scrolled ? "rgba(238,243,251,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(8,29,58,0.08)"
          : "1px solid transparent",
      }}
      className="fixed top-0 left-0 right-0 z-30 transition-all duration-300"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <div
          style={{ color: "#081D3A" }}
          className="text-lg font-black tracking-tight"
        >
          SK Solution<span style={{ color: "#FF7F00" }}>.</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {["Why Us", "Roles", "Benefits", "Process"].map((item) => (
            <button
              key={item}
              style={{ color: "#081D3A" }}
              className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
            >
              {item}
            </button>
          ))}
        </div>
        <OrangeBtn onClick={onScrollToJobs} className="text-xs px-5 py-2.5">
          View Open Roles →
        </OrangeBtn>
      </div>
    </nav>
  );
}

function Hero({ onScrollToJobs }: { onScrollToJobs: () => void }) {
  return (
    <section
      style={{ backgroundColor: "#081D3A" }}
      className="relative isolate overflow-hidden px-6 pb-28 pt-36 md:px-12 lg:px-24"
    >
      {/* Geometric grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Orange glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle,#FF7F00,transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle,#FF7F00,transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left copy */}
          <div>
            <div className="mb-6">
              <Eyebrow>We're Hiring — Join the Team</Eyebrow>
            </div>
            <h1 className="mb-6 text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
              Build software
              <br />
              <span style={{ color: "#FF7F00" }}>that shapes</span>
              <br />
              industries.
            </h1>
            <p
              className="mb-10 max-w-md text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              At SK Solution, we turn complex enterprise challenges
              into elegant digital solutions. Join a team of builders and
              craftspeople who care deeply about what they ship.
            </p>
            <div className="flex flex-wrap gap-3">
              <OrangeBtn
                onClick={onScrollToJobs}
                className="px-7 py-3.5 text-sm cursor-pointer"
              >
                View Open Positions
              </OrangeBtn>
              <Link
                to="/contact"

                className="rounded-xl border px-7 py-3.5 text-sm font-bold tracking-tight transition-all hover:bg-[#ffffff]/10 active:scale-95 cursor-pointer"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                Contact Us →
              </Link>
            </div>
          </div>

          {/* Right — abstract geometric illustration */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto h-[380px] w-[380px]">
              {/* Concentric rings */}
              <div
                className="absolute inset-0 rounded-full border-2 opacity-10"
                style={{ borderColor: "#FF7F00" }}
              />
              <div
                className="absolute inset-8 rounded-full border opacity-15"
                style={{ borderColor: "#FF7F00" }}
              />
              <div
                className="absolute inset-16 rounded-full"
                style={{ backgroundColor: "rgba(255,127,0,0.06)" }}
              />
              {/* Center block */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="rounded-3xl p-8 text-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {STATS.map((s, i) => (
                    <div
                      key={s.label}
                      className={`py-3 ${i < STATS.length - 1 ? "border-b" : ""}`}
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-3xl font-black text-white">
                        {s.value}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Orbiting dots */}
              {[0, 60, 120, 200, 280, 320].map((deg, i) => (
                <div
                  key={i}
                  className="absolute h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      i % 2 === 0 ? "#FF7F00" : "rgba(255,255,255,0.3)",
                    top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 160}px - 6px)`,
                    left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 160}px - 6px)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stats strip */}
        <div
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4 lg:hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="px-5 py-4 text-center"
              style={{ backgroundColor: "#0e2545" }}
            >
              <div className="text-xl font-black text-white">{s.value}</div>
              <div
                className="text-[11px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function WhyJoin() {
  const items = [
    {
      icon: "🚀",
      title: "Real Ownership",
      desc: "Ship features end-to-end. No ticket factories — you design, build, and own outcomes.",
    },
    {
      icon: "🧠",
      title: "Deep Learning",
      desc: "Structured mentorship, tech talks, and a dedicated learning budget to level up continuously.",
    },
    {
      icon: "🌐",
      title: "Global Impact",
      desc: "Your work reaches enterprise clients across 12 countries and millions of end users.",
    },
    {
      icon: "⚖️",
      title: "Work-Life Balance",
      desc: "Async-first culture, flexible hours, and leadership that genuinely protects your weekends.",
    },
    {
      icon: "🤝",
      title: "Tight-Knit Team",
      desc: "Small enough that everyone knows your name. Big enough for real career progression.",
    },
    {
      icon: "📈",
      title: "Clear Growth Path",
      desc: "Bi-annual reviews, transparent leveling, and promotions tied to impact — not tenure.",
    },
  ];

  return (
    <section
      style={{ backgroundColor: "#EEF3FB" }}
      className="px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-24 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-4 flex justify-center">
            <Eyebrow>Why SK Solution</Eyebrow>
          </div>
          <h2
            className="mb-4 text-center text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: "#081D3A" }}
          >
            Where great engineers do{" "}
            <span style={{ color: "#FF7F00" }}>their best work.</span>
          </h2>
          <p
            className="mx-auto mb-10 max-w-lg text-center text-sm sm:text-base md:mb-16"
            style={{ color: "rgba(8,29,58,0.55)" }}
          >
            We've thought carefully about what makes engineers thrive — and
            built the environment around it.
          </p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div
                className="group relative overflow-hidden rounded-2xl border bg-[#ffffff] p-5 transition-all duration-300 sm:p-6 sm:hover:-translate-y-1 sm:hover:shadow-[0_16px_48px_rgba(8,29,58,0.1)]"
                style={{ borderColor: "rgba(8,29,58,0.07)" }}
              >
                <div
                  className="absolute left-0 top-0 h-full w-0 rounded-l-2xl transition-all duration-300 group-hover:w-1"
                  style={{ backgroundColor: "#FF7F00" }}
                />
                <div className="mb-3 text-2xl sm:text-3xl">{item.icon}</div>
                <h3
                  className="mb-2 text-sm font-bold sm:text-base"
                  style={{ color: "#081D3A" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs leading-relaxed sm:text-sm"
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
  );
}

function LifeAtCompany() {
  return (
    <section
      style={{ backgroundColor: "#081D3A" }}
      className="px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-24 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-4 flex justify-center">
            <Eyebrow>Life at SK Solution</Eyebrow>
          </div>
          <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            A culture built by the team,{" "}
            <span style={{ color: "#FF7F00" }}>not HR decks.</span>
          </h2>
          <p
            className="mx-auto mb-10 max-w-lg text-center text-sm sm:text-base md:mb-16"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Real practices, real people, real work. Here's what makes SK
            Solution feel different from day one.
          </p>
        </Reveal>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          {CULTURE_CARDS.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <div
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 sm:p-8 sm:hover:scale-[1.01]"
                style={{
                  backgroundColor:
                    i % 2 === 0
                      ? "rgba(255,127,0,0.08)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${i % 2 === 0 ? "rgba(255,127,0,0.2)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <div
                  className="mb-3 h-1 w-8 rounded-full"
                  style={{
                    backgroundColor:
                      c.color === "#FF7F00"
                        ? "#FF7F00"
                        : "rgba(255,255,255,0.3)",
                  }}
                />
                <h3 className="mb-2 text-base font-bold text-white sm:mb-3 sm:text-lg">
                  {c.label}
                </h3>
                <p
                  className="text-xs leading-relaxed sm:text-sm"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {c.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenPositions({
  sectionRef,
  onApply,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  onApply: (job: CareerJob) => void;
}) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");

  const filtered = JOBS.filter((j) => {
    const matchDept = dept === "All" || j.department === dept;
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchDept && matchSearch;
  });

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#fff" }}
      className="px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-24 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-4 flex justify-center">
            <Eyebrow>Open Roles</Eyebrow>
          </div>
          <h2
            className="mb-4 text-center text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: "#081D3A" }}
          >
            Find your next role.
          </h2>
          <p
            className="mx-auto mb-8 max-w-md text-center text-sm sm:text-base md:mb-12"
            style={{ color: "rgba(8,29,58,0.55)" }}
          >
            All roles include competitive compensation, equity discussion, and a
            clear 90-day onboarding plan.
          </p>
        </Reveal>

        <Reveal>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role or skill…"
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition sm:flex-1 sm:min-w-[200px]"
              style={{ borderColor: "rgba(8,29,58,0.12)", color: "#081D3A" }}
              onFocus={(e) =>
                ((e.target as HTMLInputElement).style.borderColor = "#FF7F00")
              }
              onBlur={(e) =>
              ((e.target as HTMLInputElement).style.borderColor =
                "rgba(8,29,58,0.12)")
              }
            />
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className="rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150 sm:px-4 sm:text-sm"
                  style={
                    dept === d
                      ? { backgroundColor: "#081D3A", color: "#EEF3FB" }
                      : {
                        backgroundColor: "#EEF3FB",
                        color: "rgba(8,29,58,0.6)",
                        border: "1px solid rgba(8,29,58,0.12)",
                      }
                  }
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-3">
          {filtered.length === 0 && (
            <p
              className="py-12 text-center text-sm"
              style={{ color: "rgba(8,29,58,0.4)" }}
            >
              No roles match. Try a different keyword.
            </p>
          )}
          {filtered.map((job, i) => (
            <Reveal key={job.id} delay={i * 45}>
              <div
                className="group relative overflow-hidden flex flex-col gap-3 rounded-2xl border px-4 py-4 transition-all duration-200 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5 sm:hover:shadow-[0_8px_32px_rgba(8,29,58,0.1)] sm:hover:-translate-y-0.5"
                style={{
                  borderColor: "rgba(8,29,58,0.07)",
                  backgroundColor: "#EEF3FB",
                }}
              >
                {/* Orange left accent */}
                <div
                  className="absolute left-0 top-0 h-full w-0 rounded-l-2xl transition-all duration-300 group-hover:w-[3px]"
                  style={{ backgroundColor: "#FF7F00" }}
                />
                <div className="min-w-0">
                  <h3
                    className="mb-2 text-sm font-bold transition-colors group-hover:text-[#FF7F00] sm:text-base"
                    style={{ color: "#081D3A" }}
                  >
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: "rgba(8,29,58,0.06)",
                          color: "rgba(8,29,58,0.55)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: "rgba(255,127,0,0.1)",
                      color: "#FF7F00",
                      border: "1px solid rgba(255,127,0,0.2)",
                    }}
                  >
                    {job.department}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs"
                    style={{
                      backgroundColor: "rgba(8,29,58,0.05)",
                      color: "rgba(8,29,58,0.55)",
                      border: "1px solid rgba(8,29,58,0.08)",
                    }}
                  >
                    📍 {job.location}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs"
                    style={{
                      backgroundColor: "rgba(8,29,58,0.05)",
                      color: "rgba(8,29,58,0.55)",
                      border: "1px solid rgba(8,29,58,0.08)",
                    }}
                  >
                    ⏱ {job.experience}
                  </span>
                  <button
                    onClick={() => onApply(job)}
                    className="rounded-xl px-4 py-2 text-xs font-bold transition-all sm:hover:shadow-[0_4px_16px_rgba(255,127,0,0.3)]"
                    style={{ backgroundColor: "#FF7F00", color: "#fff" }}
                  >
                    Apply →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HiringProcess() {
  return (
    <section
      style={{ backgroundColor: "#EEF3FB" }}
      className="px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-24 lg:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-4 flex justify-center">
            <Eyebrow>Hiring Process</Eyebrow>
          </div>
          <h2
            className="mb-4 text-center text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: "#081D3A" }}
          >
            No surprises. No games.
          </h2>
          <p
            className="mx-auto mb-10 max-w-md text-center text-sm sm:text-base md:mb-16"
            style={{ color: "rgba(8,29,58,0.55)" }}
          >
            Five transparent steps. Average time-to-offer is 14 days.
          </p>
        </Reveal>

        <div className="relative">
          {/* Vertical connector — offset = half icon width (20px) + card padding (16px) */}
          <div
            aria-hidden
            className="absolute left-[35px] top-12 hidden sm:block"
            style={{
              width: 2,
              height: "calc(100% - 6rem)",
              background:
                "linear-gradient(to bottom, #FF7F00 0%, rgba(8,29,58,0.1) 100%)",
            }}
          />
          <div className="space-y-3 sm:space-y-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div
                  className="flex items-start gap-4 rounded-2xl border bg-[#ffffff] p-4 transition-all duration-200 sm:gap-5 sm:p-5 sm:hover:shadow-[0_8px_32px_rgba(8,29,58,0.08)] sm:hover:-translate-x-1"
                  style={{ borderColor: "rgba(8,29,58,0.07)" }}
                >
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-black text-white z-10 sm:h-10 sm:w-10 sm:text-sm"
                    style={{ backgroundColor: i === 0 ? "#FF7F00" : "#081D3A" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="mb-1 text-sm font-bold sm:text-base"
                      style={{ color: "#081D3A" }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed sm:text-sm"
                      style={{ color: "rgba(8,29,58,0.55)" }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      style={{ backgroundColor: "#EEF3FB" }}
      className="px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-24 lg:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-4 flex justify-center">
            <Eyebrow>FAQ</Eyebrow>
          </div>
          <h2
            className="mb-8 text-center text-3xl font-black tracking-tight sm:text-4xl md:mb-12 md:text-5xl"
            style={{ color: "#081D3A" }}
          >
            Questions, answered.
          </h2>
        </Reveal>

        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 45}>
              <div
                className="overflow-hidden rounded-2xl border transition-all duration-200"
                style={{
                  borderColor: open === i ? "#FF7F00" : "rgba(8,29,58,0.08)",
                  backgroundColor: "#fff",
                  boxShadow:
                    open === i ? "0 4px 24px rgba(255,127,0,0.08)" : "none",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-6 min-h-[48px]"
                >
                  <span
                    className="font-semibold text-sm leading-snug pr-2"
                    style={{ color: "#081D3A" }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="ml-2 flex-shrink-0 text-lg font-bold transition-transform duration-200 sm:ml-4"
                    style={{
                      color: "#FF7F00",
                      transform: open === i ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <div
                    className="px-4 pb-4 text-xs leading-relaxed sm:px-6 sm:pb-5 sm:text-sm"
                    style={{ color: "rgba(8,29,58,0.6)" }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
// ─── Application Drawer ────────────────────────────────────────────────────────
function ApplicationDrawer({
  job,
  onClose,
}: {
  job: CareerJob | null;
  onClose: () => void;
}) {
  const open = !!job;
  const [form, setForm] = useState<ApplicationForm>({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    resume: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      mobile: "",
      address: "",
      pincode: "",
      resume: "",
    });
    onClose();
  };

  const inputCls =
    "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition";
  const inputStyle = {
    borderColor: "rgba(8,29,58,0.12)",
    color: "#081D3A",
    backgroundColor: "#F5F8FD",
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{
          backgroundColor: "rgba(8,29,58,0.5)",
          backdropFilter: "blur(4px)",
        }}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ backgroundColor: "#fff" }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(8,29,58,0.08)" }}
        >
          <div>
            <p
              className="mb-1 text-[10px] font-black uppercase tracking-[0.16em]"
              style={{ color: "#FF7F00" }}
            >
              Apply Now
            </p>
            <h2
              className="text-lg font-black leading-snug"
              style={{ color: "#081D3A" }}
            >
              {job?.title ?? ""}
            </h2>
            {job && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(255,127,0,0.1)",
                    color: "#FF7F00",
                    border: "1px solid rgba(255,127,0,0.2)",
                  }}
                >
                  {job.department}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs"
                  style={{
                    backgroundColor: "rgba(8,29,58,0.05)",
                    color: "rgba(8,29,58,0.55)",
                  }}
                >
                  📍 {job.location}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs"
                  style={{
                    backgroundColor: "rgba(8,29,58,0.05)",
                    color: "rgba(8,29,58,0.55)",
                  }}
                >
                  ⏱ {job.experience}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border transition-colors hover:bg-gray-50"
            style={{
              borderColor: "rgba(8,29,58,0.1)",
              color: "rgba(8,29,58,0.4)",
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: "rgba(255,127,0,0.1)" }}
              >
                🎉
              </div>
              <h3
                className="mb-2 text-xl font-black"
                style={{ color: "#081D3A" }}
              >
                Application Sent!
              </h3>
              <p className="text-sm" style={{ color: "rgba(8,29,58,0.55)" }}>
                We'll review your profile and reach out within 5 business days.
              </p>
              <OrangeBtn onClick={handleClose} className="mt-8 px-6 py-3">
                Done
              </OrangeBtn>
            </div>
          ) : (
            <div className="space-y-4">
              {(
                [
                  {
                    label: "Full Name *",
                    key: "name",
                    type: "text",
                    placeholder: "Rahul Sharma",
                  },
                  {
                    label: "Email *",
                    key: "email",
                    type: "email",
                    placeholder: "rahul@example.com",
                  },
                  {
                    label: "Mobile",
                    key: "mobile",
                    type: "tel",
                    placeholder: "+91 98765 43210",
                  },
                ] as Array<{
                  label: string;
                  key: keyof ApplicationForm;
                  type: string;
                  placeholder: string;
                }>
              ).map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label
                    className="mb-1.5 block text-xs font-bold"
                    style={{ color: "rgba(8,29,58,0.55)" }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) =>
                      setForm(
                        (f) =>
                          ({ ...f, [key]: e.target.value }) as ApplicationForm,
                      )
                    }
                    className={inputCls}
                    style={inputStyle}
                    onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "#FF7F00")
                    }
                    onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "rgba(8,29,58,0.12)")
                    }
                  />
                </div>
              ))}
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold"
                  style={{ color: "rgba(8,29,58,0.55)" }}
                >
                  Role
                </label>
                <div
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold"
                  style={{
                    backgroundColor: "rgba(255,127,0,0.08)",
                    color: "#FF7F00",
                    border: "1px solid rgba(255,127,0,0.2)",
                  }}
                >
                  {job?.title ?? "—"}
                </div>
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold"
                  style={{ color: "rgba(8,29,58,0.55)" }}
                >
                  Resume / Portfolio Link
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/…"
                  value={form.resume}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, resume: e.target.value }))
                  }
                  className={inputCls}
                  style={inputStyle}
                  onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "#FF7F00")
                  }
                  onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(8,29,58,0.12)")
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label
                    className="mb-1.5 block text-xs font-bold"
                    style={{ color: "rgba(8,29,58,0.55)" }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Street, City"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                    className={inputCls}
                    style={inputStyle}
                    onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "#FF7F00")
                    }
                    onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "rgba(8,29,58,0.12)")
                    }
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-xs font-bold"
                    style={{ color: "rgba(8,29,58,0.55)" }}
                  >
                    Pin Code
                  </label>
                  <input
                    type="text"
                    placeholder="440001"
                    value={form.pincode}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, pincode: e.target.value }))
                    }
                    className={inputCls}
                    style={inputStyle}
                    onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "#FF7F00")
                    }
                    onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.borderColor =
                      "rgba(8,29,58,0.12)")
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {!submitted && (
          <div
            className="px-6 py-4"
            style={{ borderTop: "1px solid rgba(8,29,58,0.08)" }}
          >
            <button
              onClick={handleSubmit}
              disabled={!form.name || !form.email}
              className="w-full rounded-xl py-3 text-sm font-black tracking-tight transition-all hover:shadow-[0_8px_24px_rgba(255,127,0,0.3)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
              style={{ backgroundColor: "#FF7F00", color: "#fff" }}
            >
              Submit Application
            </button>
            <p
              className="mt-3 text-center text-xs"
              style={{ color: "rgba(8,29,58,0.4)" }}
            >
              We respond within 5 business days.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
const Careers = () => {
  const jobsRef = useRef<HTMLElement | null>(null);
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);

  const scrollToJobs = () =>
    jobsRef.current?.scrollIntoView({ behavior: "smooth" });
  const openDrawer = useCallback((job: CareerJob) => setSelectedJob(job), []);
  const closeDrawer = useCallback(() => setSelectedJob(null), []);

  return (
    <>
      <Navbar onScrollToJobs={scrollToJobs} />
      <main
        className="min-h-screen font-sans antialiased"
        style={{ backgroundColor: "#EEF3FB" }}
      >
        <Hero onScrollToJobs={scrollToJobs} />
        <WhyJoin />
        <OpenPositions sectionRef={jobsRef} onApply={openDrawer} />
        <HiringProcess />
        <LifeAtCompany />
        <FAQSection />
      </main>
      <ApplicationDrawer job={selectedJob} onClose={closeDrawer} />
    </>
  );
};

export default Careers;

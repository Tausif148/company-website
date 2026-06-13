import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getServiceBySlug, getRelatedServices } from "src/data/serviceData";
import {
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Mail,
  Calendar,
  ArrowLeft,
  Brain,
  Code2,
  Cpu,
  Factory,
  Cloud,
  Shield,
  BarChart3,
  Globe,
  Users,
  TrendingUp,
  Settings,
  Database,
  Lock,
} from "lucide-react";

// ─── Reveal hook (slug-aware, fixes navigation blank bug) ─────────────────────
function useReveal(slug?: string) {
  useEffect(() => {
    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach((el) => el.classList.remove("reveal-visible"));

    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(".reveal");
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("reveal-visible");
              observer.unobserve(e.target);
            }
          }),
        { threshold: 0.08 }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [slug]);
}

// ─── Per-service enrichment data ──────────────────────────────────────────────
// Keyed by slug. Falls back to generic content if slug not found.
interface ServiceEnrichment {
  tagline: string;
  overview: string;
  capabilities: { icon: React.ElementType; title: string; body: string }[];
  process: { title: string; body: string }[];
  industries: { icon: React.ElementType; name: string; useCase: string; color: string }[];
  technologies: { name: string; category: string }[];
  faqs: { q: string; a: string }[];
  stats: { value: string; label: string }[];
}

const ENRICHMENT: Record<string, ServiceEnrichment> = {
  "artificial-intelligence": {
    tagline: "Turn raw data into decisions that run faster than human review.",
    overview:
      "We design and deploy production-grade AI systems — from computer vision pipelines to large-language-model integrations — that slot into your existing infrastructure without a full rebuild. Every engagement starts with a data audit: if the signal isn't there, we say so before you spend a rupee on training.",
    capabilities: [
      { icon: Brain, title: "Machine Learning Models", body: "Custom classification, regression, and forecasting models trained on your domain data and deployed via REST or gRPC." },
      { icon: BarChart3, title: "Predictive Analytics", body: "Time-series forecasting and anomaly detection that give operations teams a 48-hour look-ahead on demand, failure, and churn." },
      { icon: Globe, title: "NLP & Conversational AI", body: "Intent-aware chatbots, document extraction, and multilingual summarisation built on fine-tuned transformer models." },
      { icon: Cpu, title: "Computer Vision", body: "Real-time object detection, OCR, and quality inspection systems that run at the edge with sub-30ms latency." },
      { icon: Settings, title: "MLOps & Model Governance", body: "CI/CD pipelines for model retraining, drift monitoring, and audit-ready explainability reports." },
      { icon: Database, title: "Data Engineering", body: "Feature stores, data lake architecture, and ETL pipelines that ensure your models always train on clean, current data." },
    ],
    process: [
      { title: "Discovery & Data Audit", body: "We map your data landscape, identify gaps, and define success metrics before any model is chosen." },
      { title: "Proof of Concept", body: "A working prototype on a subset of your data — typically delivered in two weeks — so you can validate value before committing." },
      { title: "Model Development", body: "Full training, validation, and hyperparameter optimisation with explainability baked in." },
      { title: "Integration & Deployment", body: "Container-based deployment into your cloud or on-premise stack, with API contracts your existing teams can consume." },
      { title: "Monitoring & Iteration", body: "Automated drift alerts, retraining schedules, and quarterly performance reviews included in every engagement." },
    ],
    industries: [
      { icon: BarChart3, name: "Banking & Finance", useCase: "Fraud detection, credit scoring", color: "#2563EB" },
      { icon: Shield, name: "Healthcare", useCase: "Diagnostic assistance, patient flow", color: "#16A34A" },
      { icon: Factory, name: "Manufacturing", useCase: "Predictive maintenance, visual QC", color: "#EA580C" },
      { icon: Globe, name: "Retail & E-commerce", useCase: "Demand forecasting, personalisation", color: "#7C3AED" },
    ],
    technologies: [
      { name: "Python", category: "Language" }, { name: "PyTorch", category: "ML Framework" },
      { name: "TensorFlow", category: "ML Framework" }, { name: "FastAPI", category: "Serving" },
      { name: "MLflow", category: "MLOps" }, { name: "Apache Kafka", category: "Streaming" },
      { name: "Kubernetes", category: "Orchestration" }, { name: "PostgreSQL", category: "Storage" },
    ],
    faqs: [
      { q: "How much data do we need to get started?", a: "It depends on the task. For structured tabular problems, a few thousand labelled rows can be enough. Vision and NLP tasks typically need more. We'll tell you during the discovery audit." },
      { q: "Do you work with on-premise data that can't leave our network?", a: "Yes. We deploy air-gapped or private-cloud solutions and have worked in regulated environments where data cannot touch a public cloud." },
      { q: "How long until we see ROI?", a: "Most clients see measurable impact within three months of production deployment. The PoC phase typically completes in two to four weeks." },
      { q: "Do you hand over models or manage them ongoing?", a: "Both options are available. We can do a full knowledge transfer with documentation, or retain an MLOps retainer for continuous monitoring and improvement." },
    ],
    stats: [{ value: "93%", label: "Avg. model accuracy" }, { value: "2–4 wks", label: "PoC delivery" }, { value: "3×", label: "Avg. efficiency gain" }],
  },
  "software-development": {
    tagline: "Software built to scale with your business, not around it.",
    overview:
      "From greenfield SaaS platforms to legacy modernisation, we architect and ship production software that your engineering team can maintain and extend. We work in two-week sprints with full transparency — you see every commit, every deploy, every metric.",
    capabilities: [
      { icon: Code2, title: "Web Application Development", body: "React, Next.js, and Node.js applications with architecture designed for 10× your current traffic." },
      { icon: Cloud, title: "Cloud-Native Architecture", body: "Microservices, event-driven backends, and serverless functions on AWS, GCP, or Azure." },
      { icon: Database, title: "API Design & Integration", body: "RESTful and GraphQL APIs with versioning strategies, rate limiting, and OpenAPI documentation." },
      { icon: Shield, title: "Security by Design", body: "OWASP-aligned development practices, automated SAST scanning, and penetration testing at key milestones." },
      { icon: Settings, title: "DevOps & CI/CD", body: "GitHub Actions / GitLab CI pipelines, Docker, Kubernetes, and infrastructure-as-code with Terraform." },
      { icon: TrendingUp, title: "Performance Engineering", body: "Load testing, profiling, and optimisation that gets p99 latency where your SLA demands it." },
    ],
    process: [
      { title: "Technical Discovery", body: "Architecture review of existing systems, risk identification, and a recommended tech stack with justification." },
      { title: "Sprint Zero", body: "Repository setup, CI/CD pipeline, environments, and coding standards — so day-one code is production-ready code." },
      { title: "Iterative Development", body: "Two-week sprints with working software demos. Backlog is always visible and re-prioritisable." },
      { title: "QA & Testing", body: "Unit, integration, and end-to-end test suites with coverage gates. No merge without a passing build." },
      { title: "Release & Handover", body: "Blue-green deployment, runbooks, and architecture documentation so your team owns it day one." },
    ],
    industries: [
      { icon: BarChart3, name: "Fintech", useCase: "Trading platforms, payment gateways", color: "#2563EB" },
      { icon: Globe, name: "SaaS Products", useCase: "Multi-tenant platforms, billing flows", color: "#7C3AED" },
      { icon: Factory, name: "Manufacturing ERP", useCase: "Custom MES and inventory systems", color: "#EA580C" },
      { icon: Shield, name: "Healthcare IT", useCase: "HIPAA-compliant portals, FHIR APIs", color: "#16A34A" },
    ],
    technologies: [
      { name: "React / Next.js", category: "Frontend" }, { name: "Node.js", category: "Backend" },
      { name: "TypeScript", category: "Language" }, { name: "PostgreSQL", category: "Database" },
      { name: "Docker", category: "Containers" }, { name: "Terraform", category: "IaC" },
      { name: "GitHub Actions", category: "CI/CD" }, { name: "AWS / GCP", category: "Cloud" },
    ],
    faqs: [
      { q: "Do you work on fixed-price or time-and-materials?", a: "Both. Fixed-price works well for well-scoped features. T&M with a monthly cap works for evolving products. We'll recommend the right model after scoping." },
      { q: "Can you work with our in-house developers?", a: "Yes. We embed within existing teams regularly and adapt to your Git workflow, code review process, and stand-up cadence." },
      { q: "What happens after launch?", a: "We offer post-launch support retainers and can transition to a smaller maintenance team once the product stabilises." },
      { q: "How do you handle IP and code ownership?", a: "All code, documentation, and assets become your property at contract close. We retain no rights to anything built for you." },
    ],
    stats: [{ value: "200+", label: "Projects delivered" }, { value: "2-wk", label: "Sprint cadence" }, { value: "99.9%", label: "Uptime SLA" }],
  },
};

// Generic fallback enrichment for slugs not in the map
const GENERIC_ENRICHMENT: ServiceEnrichment = {
  tagline: "Enterprise-grade solutions built for real-world complexity.",
  overview:
    "We bring deep technical expertise and a pragmatic delivery methodology to every engagement. Our teams work as an extension of yours — with full transparency, defined milestones, and accountability for outcomes, not just outputs.",
  capabilities: [
    { icon: Settings, title: "Consulting & Strategy", body: "Architecture reviews, technology roadmaps, and build-vs-buy analysis grounded in your commercial context." },
    { icon: Code2, title: "Implementation", body: "Full-stack delivery teams that go from design to production in structured, trackable sprints." },
    { icon: Shield, title: "Security & Compliance", body: "Security-first engineering with compliance mapping for ISO 27001, SOC 2, and sector-specific regulations." },
    { icon: TrendingUp, title: "Performance Optimisation", body: "Profiling, load testing, and targeted refactoring that reduces latency and infrastructure spend." },
    { icon: Database, title: "Data & Integration", body: "API design, data pipeline architecture, and third-party integration that makes your systems talk to each other." },
    { icon: Users, title: "Training & Handover", body: "Documentation, workshops, and knowledge-transfer sessions so your team owns every system we build." },
  ],
  process: [
    { title: "Discovery", body: "Stakeholder interviews, current-state audit, and a written recommendations brief." },
    { title: "Planning", body: "Sprint breakdown, milestone map, and risk register reviewed and agreed with your team." },
    { title: "Delivery", body: "Iterative builds with working demos every two weeks and a visible, re-prioritisable backlog." },
    { title: "QA & Review", body: "Automated test coverage, manual exploratory testing, and a structured sign-off process." },
    { title: "Launch & Support", body: "Production deployment with runbooks, monitoring setup, and a defined post-launch support window." },
  ],
  industries: [
    { icon: BarChart3, name: "Finance", useCase: "Regulated platforms, reporting tools", color: "#2563EB" },
    { icon: Factory, name: "Manufacturing", useCase: "Operations software, MES systems", color: "#EA580C" },
    { icon: Globe, name: "Logistics", useCase: "Fleet tracking, supply chain visibility", color: "#0891B2" },
    { icon: Shield, name: "Government", useCase: "Citizen portals, data platforms", color: "#16A34A" },
  ],
  technologies: [
    { name: "React", category: "Frontend" }, { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Language" }, { name: "PostgreSQL", category: "Database" },
    { name: "Docker", category: "Containers" }, { name: "AWS", category: "Cloud" },
    { name: "Kubernetes", category: "Orchestration" }, { name: "Terraform", category: "IaC" },
  ],
  faqs: [
    { q: "How do engagements typically start?", a: "With a discovery workshop — usually a half-day session where we map your current state, goals, and constraints before any proposal is written." },
    { q: "What team size should we expect?", a: "Most engagements run with a lead engineer, 1–2 developers, and a project manager. We scale up or down based on sprint commitments." },
    { q: "Do you offer fixed-price projects?", a: "Yes, for well-defined scopes. We'll recommend fixed-price or time-and-materials after an initial scoping session." },
    { q: "Where are your teams based?", a: "Our core team is in Pune, Maharashtra. We work across IST and can accommodate overlapping hours with European and US-based clients." },
  ],
  stats: [{ value: "10+", label: "Years experience" }, { value: "200+", label: "Clients served" }, { value: "98%", label: "Client retention" }],
};

// ─── Small reusable atoms ─────────────────────────────────────────────────────
const AccentBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-[#FF7F00]/10 text-[#FF7F00] border border-[#FF7F00]/20 text-xs font-semibold rounded-full px-3 py-1">
    {children}
  </span>
);

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 min-w-[90px]">
    <span className="text-2xl font-bold text-white leading-none">{value}</span>
    <span className="text-xs text-slate-300 mt-1 text-center">{label}</span>
  </div>
);

// ─── FAQ accordion ────────────────────────────────────────────────────────────
const FAQ: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold text-[#081D3A] group-hover:text-[#FF7F00] transition-colors duration-200">
          {q}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="text-sm text-slate-500 leading-relaxed pb-4">{a}</p>}
    </div>
  );
};

// ─── Related service card ─────────────────────────────────────────────────────
const RelatedCard: React.FC<{ s: ReturnType<typeof getRelatedServices>[number] }> = ({ s }) => {
  const Icon = s.icon;
  return (
    <Link
      to={`/services/${s.slug}`}
      className="group flex flex-col bg-white rounded-[20px] border border-slate-100
        shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgba(8,29,58,0.1)]
        hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Top colour strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#081D3A] to-[#1453E6] group-hover:from-[#FF7F00] group-hover:to-[#e67300] transition-all duration-500" />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3FB] mb-4 group-hover:bg-[#FF7F00]/10 transition-colors duration-300">
          <Icon className="h-5 w-5 text-[#1453E6] group-hover:text-[#FF7F00] transition-colors duration-300" />
        </div>
        <h3 className="font-bold text-[#081D3A] text-base mb-2">{s.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">{s.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1453E6] group-hover:text-[#FF7F00] group-hover:gap-2.5 transition-all duration-200">
          Learn More <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

// ─── Main page ─────────────────────────────────────────────────────────────────
const ServicesDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  useReveal(slug);

  const service = slug ? getServiceBySlug(slug) : undefined;
  const related = slug ? getRelatedServices(slug) : [];
  const enrich: ServiceEnrichment = (slug && ENRICHMENT[slug]) ? ENRICHMENT[slug] : GENERIC_ENRICHMENT;

  useEffect(() => {
    if (!service) navigate("/services", { replace: true });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [service, navigate]);

  if (!service) return null;

  const ServiceIcon = service.icon;

  return (
    <>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .reveal-visible { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1 !important; transform: none !important; } }
        .hero-gradient { background: linear-gradient(135deg, #081D3A 0%, #0d2a56 60%, #081D3A 100%); }
        .process-line::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 40px;
          bottom: -16px;
          width: 2px;
          background: linear-gradient(to bottom, #FF7F00, transparent);
        }
      `}</style>

      <main className="bg-[#F7F8FC] min-h-screen">

        {/* ══════════════════════════════════════════════
            HERO — dark full-bleed
        ══════════════════════════════════════════════ */}
        <div className="hero-gradient">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-20">

            {/* Breadcrumb + back */}
            <div className="flex items-center justify-between mb-10">
              <nav className="flex items-center gap-2 text-xs text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                <span>/</span>
                <span className="text-slate-300">{service.title}</span>
              </nav>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            </div>

            {/* Hero content — two-col on lg */}
            <div className="grid lg:grid-cols-[1fr_680px] items-center">
              {/* Left */}
              <div className="reveal flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20 shrink-0">
                    <ServiceIcon className="h-7 w-7 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-tight tracking-tight">
                    {service.title}
                  </h1>
                </div>

                <p className="text-[#FF7F00] font-semibold text-base sm:text-lg leading-snug">
                  {enrich.tagline}
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  {service.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-3 py-1">
                  {enrich.stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} />)}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    to="/contact"
                    className="bg-[#FF7F00] hover:bg-[#e67300] text-white font-semibold
                      px-7 py-3 rounded-xl transition-all duration-200 inline-flex items-center gap-2
                      shadow-[0_4px_16px_rgba(255,127,0,0.4)] hover:shadow-[0_6px_24px_rgba(255,127,0,0.5)]"
                  >
                    Request Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/services"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold
                      px-7 py-3 rounded-xl border border-white/20 transition-all duration-200"
                  >
                    Explore All Services
                  </Link>
                </div>
              </div>

              {/* Right — overview card */}
              <div className="reveal bg-white/8 backdrop-blur-sm border border-white/15 rounded-[24px] p-6 sm:p-8" style={{ transitionDelay: "0.1s" }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FF7F00] mb-4">
                  Service Overview
                </p>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {enrich.overview}
                </p>
                <div className="mt-6 flex flex-col gap-2.5">
                  {enrich.capabilities.slice(0, 3).map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.title} className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF7F00]/15 shrink-0">
                          <Icon className="h-3.5 w-3.5 text-[#FF7F00]" />
                        </div>
                        <span className="text-sm text-slate-300 font-medium">{c.title}</span>
                      </div>
                    );
                  })}
                  <p className="text-xs text-slate-500 mt-1 pl-10">+{enrich.capabilities.length - 3} more capabilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            CAPABILITIES GRID
        ══════════════════════════════════════════════ */}
        <div className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal mb-10">
              <AccentBadge>What we do</AccentBadge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#081D3A]">Key Capabilities</h2>
              <p className="mt-2 text-slate-500 text-base">Everything we bring to a {service.title} engagement.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrich.capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="reveal group relative bg-white rounded-[20px] p-6 border border-slate-100
                      shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(8,29,58,0.1)]
                      hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    {/* Accent corner wash */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FF7F00]/6 to-transparent rounded-bl-[50px]" />
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF3FB] mb-4 group-hover:bg-[#FF7F00]/10 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-[#1453E6] group-hover:text-[#FF7F00] transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-[#081D3A] mb-2 text-base">{cap.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{cap.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            PROCESS — numbered vertical timeline on mobile, horizontal steps on lg
        ══════════════════════════════════════════════ */}
        <div className="bg-white py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal mb-10">
              <AccentBadge>How it works</AccentBadge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#081D3A]">Delivery Process</h2>
              <p className="mt-2 text-slate-500 text-base">A consistent method that keeps every engagement predictable and transparent.</p>
            </div>
            {/* Mobile: vertical timeline */}
            <div className="flex flex-col gap-0 lg:hidden">
              {enrich.process.map((step, i) => (
                <div key={step.title} className="reveal relative flex gap-5 pb-8 last:pb-0 process-line last:before:hidden" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#081D3A] text-white text-sm font-bold shrink-0 z-10">
                    {i + 1}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-bold text-[#081D3A] mb-1">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop: horizontal cards with numbered connectors */}
            <div className="hidden lg:grid gap-0" style={{ gridTemplateColumns: `repeat(${enrich.process.length}, 1fr)` }}>
              {enrich.process.map((step, i) => (
                <div key={step.title} className="reveal relative flex flex-col items-center text-center px-3" style={{ transitionDelay: `${i * 0.07}s` }}>
                  {/* Connector line */}
                  {i < enrich.process.length - 1 && (
                    <div className="absolute top-5 left-[calc(50%+20px)] right-[-calc(50%-20px)] h-0.5 bg-gradient-to-r from-[#081D3A]/30 to-[#FF7F00]/30" style={{ width: "calc(100% - 40px)", left: "calc(50% + 20px)" }} />
                  )}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#081D3A] text-white text-sm font-bold mb-4 z-10 relative">
                    {i + 1}
                  </div>
                  <div className="bg-[#F7F8FC] rounded-[16px] border border-slate-100 p-4 w-full">
                    <h3 className="font-bold text-[#081D3A] text-sm mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            INDUSTRIES
        ══════════════════════════════════════════════ */}
        <div className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal mb-10">
              <AccentBadge>Who we serve</AccentBadge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#081D3A]">Industries</h2>
              <p className="mt-2 text-slate-500 text-base">Sector-specific experience that shortens your time to value.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {enrich.industries.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={ind.name}
                    className="reveal group bg-white rounded-[20px] border border-slate-100 p-6
                      shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]
                      hover:-translate-y-1 transition-all duration-300"
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                      style={{ backgroundColor: `${ind.color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: ind.color }} />
                    </div>
                    <h3 className="font-bold text-[#081D3A] mb-1.5">{ind.name}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{ind.useCase}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TECHNOLOGIES
        ══════════════════════════════════════════════ */}
        <div className="bg-white py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
              <div className="reveal">
                <AccentBadge>Tech stack</AccentBadge>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#081D3A]">Technologies Used</h2>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  We choose tools for their production track record, not hype cycles. Every technology in our stack has been battle-tested across real enterprise deployments.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {[
                    { icon: Lock, label: "No vendor lock-in — we use open standards" },
                    { icon: Shield, label: "Every dependency is security-audited" },
                    { icon: TrendingUp, label: "Stack chosen to match your scale target" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF7F00]/10 shrink-0">
                        <Icon className="h-4 w-4 text-[#FF7F00]" />
                      </div>
                      <span className="text-sm text-slate-600">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal" style={{ transitionDelay: "0.1s" }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {enrich.technologies.map((tech, i) => (
                    <div
                      key={tech.name}
                      className="group flex flex-col items-center justify-center bg-[#F7F8FC] hover:bg-[#EEF3FB]
                        border border-slate-100 hover:border-[#1453E6]/20 rounded-2xl p-4
                        transition-all duration-200 hover:-translate-y-0.5 text-center"
                    >
                      <span className="text-xs font-bold text-[#081D3A] group-hover:text-[#1453E6] transition-colors duration-200">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">{tech.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════ */}
        <div className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
              <div className="reveal">
                <AccentBadge>FAQ</AccentBadge>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-[#081D3A] leading-tight">
                  Common questions about {service.title}
                </h2>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  Don't see your question here? Reach out and someone from our team will respond within one business day.
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF7F00] hover:gap-3 transition-all duration-200"
                >
                  Ask a question <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="reveal bg-white rounded-[20px] border border-slate-100 px-6 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.04)]" style={{ transitionDelay: "0.1s" }}>
                {enrich.faqs.map((faq) => (
                  <FAQ key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            RELATED SERVICES
        ══════════════════════════════════════════════ */}
        {related.length > 0 && (
          <div className="bg-white py-16 lg:py-20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="reveal mb-10">
                <AccentBadge>More from SK Solution</AccentBadge>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#081D3A]">Related Services</h2>
                <p className="mt-2 text-slate-500 text-base">Services that pair well with {service.title}.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((s) => <RelatedCard key={s.slug} s={s} />)}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            CONSULTATION CTA
        ══════════════════════════════════════════════ */}
        <div className="py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal bg-gradient-to-br from-[#081D3A] via-[#0f2d5a] to-[#081D3A] rounded-[28px] overflow-hidden border border-white/10">
              <div className="grid lg:grid-cols-[1fr_auto] items-center gap-8 p-8 sm:p-10 lg:p-12">
                <div>
                  <AccentBadge>Free consultation</AccentBadge>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white leading-tight">
                    Ready to get started with {service.title}?
                  </h2>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-lg">
                    Book a 30-minute discovery call with one of our specialists. No pitch — just an honest conversation about your goals and whether we're the right fit.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    {[
                      { icon: PhoneCall, label: "30-min discovery call" },
                      { icon: Calendar, label: "Flexible scheduling" },
                      { icon: Mail, label: "Response in 1 business day" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF7F00]/15 shrink-0">
                          <Icon className="h-4 w-4 text-[#FF7F00]" />
                        </div>
                        <span className="text-sm text-slate-300">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Link
                    to="/contact"
                    className="bg-[#FF7F00] hover:bg-[#e67300] text-white font-semibold
                      px-8 py-3.5 rounded-xl transition-all duration-200 text-center
                      shadow-[0_4px_16px_rgba(255,127,0,0.4)] hover:shadow-[0_6px_24px_rgba(255,127,0,0.5)]
                      inline-flex items-center justify-center gap-2"
                  >
                    Book a Call <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/services"
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold
                      px-8 py-3.5 rounded-xl border border-white/20 transition-all duration-200 text-center"
                  >
                    All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
};

export default ServicesDetails;